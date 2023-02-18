import {data} from './data.js'

//получаем массив месяцев, имён для графика
let month = [];
let name = [];

data.forEach(element => {
    month.push(element['period']);
    name.push(element['name']);
})
month = Array.from(new Set(month));
name = Array.from(new Set(name));

let seriesData = []
name.forEach(currentName=>{
    let nameData = [];
    month.forEach(currentMonth=>{
        data.forEach(currentData =>{
            if (currentData['period']===currentMonth && currentData['name']===currentName) {
                nameData.push(currentData['value'])
            } 
        })
    })
    seriesData.push(nameData)
})

console.log(seriesData)

let container = document.getElementById('main');

fetch('walden.json')
  .then(r => r.json())
  .then(theme => {
    echarts.registerTheme('walden', theme);
    let chart = echarts.init(container, 'walden'); 
    
    let mySeries = [
        {
            name: name[1],
            type: 'bar',
            stack: 'In Program',
            emphasis: {
                focus: 'none'
            },
            data: seriesData[1]
        },
        {
            name: name[0],
            type: 'bar',
            stack: 'In Program',
            stackStrategy: 'all',
            emphasis: {
                focus: 'none'
            },
            data: seriesData[0],
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: (params) => {
                        let total = 0;
                        mySeries.forEach(serie => {
                            if (serie.stack === 'In Program'){
                                total += serie.data[params.dataIndex];
                            }
                        })
                    return total;
                    }
                }
            }
        },
        {
            name: name[3],
            type: 'bar',
            stack: 'Outside Program',
            emphasis: {
                focus: 'none'
            },
            data: seriesData[3]
        },
        {
            name: name[2],
            type: 'bar',
            stack: 'Outside Program',
            emphasis: {
                focus: 'none'
            },
            data: seriesData[2],
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: (params) => {
                        let total = 0;
                        mySeries.forEach(serie => {
                            if (serie.stack === 'Outside Program'){
                                total += serie.data[params.dataIndex];
                            }
                        })
                    return total;
                    }
                }
            }
        }
    ]
    
    const option = {
        title: {
            text: 'Проекты в программах и вне программ',
            subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ'
        },
        legend: {
            icon: 'circle',
            left: '15%',
            top: '95%',
            data: [
                {
                    name: name[0]
                },
                {
                    name: name[1]
                },
                {
                    name: name[2]
                },
                {
                    name: name[3]
                }
            ]
        },
        xAxis: {
            type: 'category',
            data: month,
            axisTick: {
                alignWithLabel: true
            },
            
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "line",
                axis: "auto",
                animation: "auto",
                animationDurationUpdate: "200",
                animationEasingUpdate: "exponentialOut"
            },
            crossStyle: {
                color: "#999",
                width: 1,
            },
          },
      }
      chart.setOption(option)
      chart.setOption({
        series: mySeries
      })
    });