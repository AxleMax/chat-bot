const puppeteer = require('puppeteer');
const fs = require('fs')
async function htmlToBase64(html, selector = 'body') {
    console.log('开始绘制')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // 设置页面内容
        await page.setContent(html, {
            waitUntil: 'networkidle0' // 等待页面加载完成
        });

        // 定位目标元素
        const element = await page.$(selector);

        if (!element) {
            throw new Error(`Element with selector "${selector}" not found`);
        }

        // 截图并获取 buffer
        const buffer = await element.screenshot({
            type: 'png',
            encoding: "base64"
        });

        // //保存base64
        // fs.writeFileSync('./test.txt', `data:image/png;base64,${buffer}`)
        // //保存图片
        // fs.writeFileSync('./test.png', buffer)
        console.log('绘制完成')
        return `data:image/png;base64,${buffer}`;

    } catch (err) {
        console.log('绘制err>>', err)
    } finally {
        await browser.close(); // 确保关闭浏览器
    }
}
module.exports = (bot) => {
    bot.plugins.htmlToBase64 = htmlToBase64
}