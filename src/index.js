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

//получаем массивы данных для каждой категории данных
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

//создаём ссылку на объект DOM-дерева с id = "main"
let container = document.getElementById('main');

//загружаем первичную настройку темы из Theme Builder of Echarts
fetch('./src/walden.json')
  .then(r => r.json())
  .then(theme => {
    echarts.registerTheme('walden', theme);
    let chart = echarts.init(container, 'walden'); 
    //создаём шаблоны элементов диаграммы с накоплением
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
                show: true,
                position: 'top',
                fontWeight: 'bold',
                //реализуем функцию по подсчёту суммарного значения одного стека диаграммы
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
            select: {
                selectedMode: true
            },
            data: seriesData[2],
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontWeight: 'bold',
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
    //основные параметры диаграммы
    const option = {
        title: {
            text: 'Проекты в программах и вне программ',
            subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ'
        },
        legend: {
            icon: 'circle',
            left: '15%',
            top: '95%',
            data: [name[0], name[1], name[2], name[3]],
        },
        grid: {
            left: '6%',
            top: '15%'
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