const readline = require('readline')
const Bot = require('./utils/websocket')
const sdk = require('./utils/sdk')
const chatBot = new Bot('ws://192.168.3.102:3001')
const demo1 = require('./plugins/mcServerInfo')
sdk(chatBot)
demo1(chatBot)
const r1 = readline.createInterface({
    input: process.stdin
})
r1.on('line', (line) => {
    try {
        eval(line)
    } catch (e) {
        console.log('err>>', e)
    }
})
// chatBot.on('message', (data) => {
//     if (data.echo) {
//         console.log('res', data)
//     } else {
//         console.log(data.post_type, data)
//     }
// })
