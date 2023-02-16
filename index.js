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

console.log(month)
console.log(name)


let container = document.getElementById('main');


fetch('walden.json')
  .then(r => r.json())
  .then(theme => {
    echarts.registerTheme('walden', theme);
    let chart = echarts.init(container, 'walden');
    chart.setOption({
        title: {
            text: 'Проекты в программах и вне программ',
            subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ'
        },
        xAxis: {
            type: 'category',
            data: month,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'В программе ЦП П',
                type: 'bar',
                data: [120, 200, 150]
            }
        ]
      });
  })