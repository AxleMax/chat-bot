const readline = require('readline')
const qBot = require('./utils/websocket')
const sdk = require('./utils/sdk')
const bot = qBot.createBot()

bot.once('socketed', () => {
    sdk(bot)
    bot.sdk.loadPlugins()
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

