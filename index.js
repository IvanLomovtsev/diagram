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
        legend: {},
        xAxis: {
            type: 'category',
            data: month,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: name[0],
                type: 'bar',
                stack: 'In Program',
                emphasis: {
                    focus: 'none'
                },
                data: [20, 60, 70, 30, 50, 75, 60]
            },
            {
                name: name[1],
                type: 'bar',
                stack: 'In Program',
                emphasis: {
                    focus: 'none'
                },
                data: [10, 10, 10, 10, 10, 10, 10]
            },
            {
                name: name[2],
                type: 'bar',
                stack: 'Outside Program',
                emphasis: {
                    focus: 'none'
                },
                data: [30, 40, 30, 50, 45, 20, 10]
            },
            {
                name: name[3],
                type: 'bar',
                stack: 'Outside Program',
                emphasis: {
                    focus: 'none'
                },
                data: [10, 10, 10, 10, 10, 10, 10]
            }
        ]
      });
  })