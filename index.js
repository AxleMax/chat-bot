const readline = require('readline')
const Bot = require('./utils/websocket')
const sdk = require('./utils/sdk')
const chatBot = new Bot()

chatBot.once('socketed', () => {
    sdk(chatBot)
    chatBot.sdk.loadPlugins()
})
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

