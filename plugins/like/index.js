const Bot = require('../../utils/websocket')
class Like {
    constructor(bot) {
        this.bot = bot
    }
    async like({ qq, times }) {
        this.bot.sdk.like(qq, times)
        if (typeof qq === 'object') {
            for (let i of qq) {
                this.bot.sdk.like(i, times)
                await this.bot.sdk.sleep(100)
            }
        } else if (typeof qq === 'string') {
            this.bot.sdk.like(qq, times)
        }
    }

}
module.exports = (qBot) => {
    const bot = Bot.pluginInit(qBot)    //获取类型推导,不需要可以直接删除 bot.plugins.like = new Like(qBot)

    bot.plugins.like = new Like(bot)
    bot.on('message', (data) => {
        if (bot.sdk.findK(data.message, '/赞我').length > 0) {
            bot.records.push({
                payload: data,
                echo: bot.sdk.like(data.user_id, 10)
            })
        }

        if (bot.records.length > 0 && bot.records.some(v => v.echo === data.echo)) {
            const record = bot.records.filter(v => v.echo === data.echo)[0]

            const msg = data.status === 'failed' ? '爪巴' : [{ "type": "face", "data": { "id": "424" } }, { "type": "face", "data": { "id": "333" } }, { "type": "text", "data": { "text": "➕10" } }]

            bot.sdk.send_auto_msg(record.payload, msg)

            bot.records.splice(bot.records.findIndex(v => v.echo === data.echo), 1)
        }

    })
}