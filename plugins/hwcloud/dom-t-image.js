const echarts = require('echarts');
const { createCanvas } = require('canvas');
const fs = require('fs');

// 创建一个 canvas 实例（指定宽度和高度）
const canvas = createCanvas(600, 400);
const ctx = canvas.getContext('2d');

// 创建一个 ECharts 实例
const myChart = echarts.init(canvas);

// 配置图表的基本选项
const option = {
    title: {
        text: 'ECharts 示例',
    },
    tooltip: {},
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10],
    }]
};

// 使用 `setOption` 设置图表选项
myChart.setOption(option);

// 将图表渲染为图片（base64 数据 URL）
const imgData = canvas.toDataURL('image/png');

// 保存为文件
const base64Data = imgData.replace(/^data:image\/png;base64,/, '');
fs.writeFileSync('chart.png', base64Data, 'base64');

console.log('图表已保存为 chart.png');
