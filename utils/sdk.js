class SDK {
    constructor(qbot) {
        this.bot = qbot
    }
    generateEcho() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    send(ctx) {
        this.bot.ws.send(JSON.stringify(ctx))
    }
    async send_private_msg(id, msg) {
        const ctx = {
            action: "send_private_msg",
            params: {
                user_id: id,
                message: msg
            },
            echo: this.generateEcho()
        }
        this.send(ctx)
    }
    async send_group_msg(id,msg){
        const ctx = {
            action: "send_group_msg",
            params: {
                group_id: id,
                message: msg
            },
            echo: this.generateEcho()
        }
        this.send(ctx)
    }
    get_group_list() {
        const ctx = {
            action: 'get_group_list',
            params: {
                "no_cache": false
            }
        }
        this.send(ctx)
    }
}

module.exports = (qBot) => {
    qBot.sdk = new SDK(qBot)
}