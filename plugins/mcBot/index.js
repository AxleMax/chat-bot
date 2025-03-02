const { pluginInit } = require('../../utils/websocket')
const path = require('path')
const fs = require('fs')
const DNS = require("dns")
const EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();


class McBot {
    constructor(qBot) {
        this.qBot = qBot
        this.ins = null
        this.isRunning = false
        this.isListening = false
        this.server = null
    }
    parseAddress(value, defaultPort = 25565) {
        const addressMatch = /^([^:]+)(?::(\d{1,5}))?$/;
        const match = value.match(addressMatch);
        if (!match)
            return null;
        const port = match[2] ? parseInt(match[2]) : defaultPort;
        if (isNaN(port) || port < 1 || port > 65535)
            return null;
        return {
            host: match[1],
            port
        };
    }
    resolveSRV(host, protocol = 'tcp') {
        return new Promise((resolve) => {
            DNS.resolveSrv(`_minecraft._${protocol}.${host}`, (error, addresses) => {
                if (error || addresses.length < 1)
                    return resolve(null);
                const address = addresses[0];
                resolve({ host: address.name, port: address.port });
            });
        });
    }
    async join(address) {
        if (this.ins) return { status: false, message: '已加入服务器, 请使用/mcbot stop 停止机器' }
        let { host, port } = this.parseAddress(address)
        if (!host) return { status: false, message: '地址错误' }
        const setting = path.join(process.cwd(), 'plugins', 'mcBot', 'server', address, 'index.js')

        if (!fs.existsSync(setting)) return { status: false, message: '未配置该服务器对应配置' } //后续可以尝试通用配置
        //删除模块缓存
        delete require.cache[require.resolve(setting)]
        return require(setting)(event).then(res => {
            this.ins = res
            this.isRunning = true
            this.server = address
            return { status: true, message: '加入成功' }
        }).catch(err => {
            console.log(err)
            this.isRunning = false
            console.log('err', err)
            return { status: false, message: `加入失败: ${err}` }
        })

    }
    async list() {
        if (!this.isRunning || !this.ins) return { status: false, message: '未加入服务器' }
        if (!this.ins.players) return { status: false, message: '未获取该服务器玩家' }
        return { status: true, data: Object.keys(this.ins.players) }
    }
    async listen() {
        if (!this.isRunning || !this.ins) return { status: false, message: '未加入服务器' }
        if (this.isListening) return { status: true, message: '已开启监听' }
        this.isListening = true
        return { status: true, message: '开启监听' }
    }
    stopListen() {
        if (!this.isRunning || !this.isListening) return
        this.isListening = false
        event.removeAllListeners('chat')
    }
    async stop() {
        try {
            if (!this.ins) return { status: false, message: '未加入服务器' }
            this.ins.quit()
            this.ins.removeAllListeners();
            this.isRunning = false
            this.ins = null
            this.isListening = false
            this.server = null
            return { status: true, message: '停止成功' }
        } catch (err) {
            console.log(err)
            return { status: false, message: '停止失败' }
        }
    }
}


module.exports = (qBot) => {
    try {
        let reply
        let bot = pluginInit(qBot)
        bot.plugins.mcbot = new McBot(bot)
        bot.on('message', async (payload) => {
            const raw_msg = payload.raw_message
            if (!raw_msg || !raw_msg.startsWith('/mcbot')) return
            const args = raw_msg.split(' ')

            let info = null
            let res
            switch (true) {
                case args[1] === 'list':
                    res = await bot.plugins.mcbot.list()
                    console.log(res)
                    if (res.status) {
                        info = `当前在线玩家：${res.data.join(', ')}`
                    } else {
                        info = `获取失败`
                    }
                    // bot.sdk.send_auto_msg(payload, [{
                    //     type: 'file',
                    //     data: {
                    //         "file": bot.sdk.baseText(info)
                    //     }
                    // }])
                    // return
                    break;
                case args[1] === 'join':
                    res = await bot.plugins.mcbot.join(args[2])
                    console.log(res)
                    info = res.message
                    break
                case args[1] === 'listen':
                    reply = payload
                    res = await bot.plugins.mcbot.listen()
                    info = res.message
                    break
                case args[1] === 'help':
                    info =
                        `/mcbot help --帮助\n/mcbot list --查看在线玩家\n/mcbot join <server> --加入<server>服务器\n/mcbot listen --监听服务器,前提<join>\n/mcbot status --查看当前bot状态\n/mcbot stop --停止mcbot`
                    break;
                case args[1] === 'status':
                    info = `当前状态：${bot.plugins.mcbot.isRunning ? '运行中' : '未运行'}\n当前服务器:${bot.plugins.mcbot.server || '未加入'}\n服务器人数:${bot.plugins.mcbot.ins ? Object.keys(bot.plugins.mcbot.ins.players).length : 0}\n当前是否监听:${bot.plugins.mcbot.isListening}`
                    break;
                case args[1] === 'stop':
                    res = await bot.plugins.mcbot.stop()
                    info = res.message
                    break;
                default:
                    info = `输入/mcbot help 查看指令`
                    break;
            }
            if (!info) return
            bot.sdk.send_auto_msg(payload, [{
                type: 'text',
                data: {
                    text: info
                }
            }])
        })

        event.on('chat', (data) => {
            if (bot.plugins.mcbot.isListening) {
                bot.sdk.send_auto_msg(reply, [{
                    type: 'text',
                    data: {
                        text: data[0]
                    }
                }])
            }
        })
    } catch (err) {
        console.log('catch', err)
    }

}