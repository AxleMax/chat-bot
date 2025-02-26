const { pluginInit } = require('../../utils/websocket')
const path = require('path')
const fs = require('fs')
const DNS = require("dns")

class McBot {
    constructor(qBot) {
        this.qBot = qBot
        this.ins = null
        this.isRunning = false
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
        let { host, port } = this.parseAddress(address)
        if (!host) return { status: false, message: '地址错误' }
        const setting = path.join(process.cwd(), 'plugins', 'mcBot', 'server', address, 'index.js')

        if (!fs.existsSync(setting)) return { status: false, message: '未配置该服务器对应配置' } //后续可以尝试通用配置
        //删除模块缓存
        delete require.cache[require.resolve(setting)]
        return require(setting)().then(res => {
            this.ins = res
            this.isRunning = true
            console.log('res',res)
            return { status: true, message: '加入成功' }
        }).catch(err => {
            console.log(err)
            this.isRunning = false
            console.log('err',err)
            return { status: false, message: `加入失败: ${err}` }
        })
   
    }
    async list(address) {
        if (!this.isRunning || !this.ins) return { status: false, message: '未加入服务器' }
        if (!this.ins.players) return { status: false, message: '未获取该服务器玩家' }
        return { status: true, data: Object.keys(this.ins.players) }
    }
}


module.exports = (qBot) => {
    try {
        let bot = pluginInit(qBot)
        bot.plugins.mcbot = new McBot(bot)
        bot.on('message', async (payload) => {
            const raw_msg = payload.raw_message
            if (!raw_msg || !raw_msg.startsWith('/mcbot')) return
            const args = raw_msg.split(' ')
            console.log(args)
            let info = null
            let res
            switch (true) {
                case args[1] === 'list':
                    res = bot.plugins.mcbot.list()
                    if (res.status) {
                        info = `当前在线玩家：${res.data.join(', ')}`
                    } else {
                        info = res.message
                    }
                    break;
                case args[1] === 'join':
                    res = await bot.plugins.mcbot.join(args[2])
                    console.log(res)
                    info = res.message
                    break
                case args[1] === 'help':
                    info =
                        `/mcbot help --帮助\n/mcbot list --查看在线玩家\n/mcbot join <server> --加入<server>服务器\n/mcbot listen --监听服务器,前提<join>\n/mcbot status --查看当前bot状态\n/mcbot stop --停止监听服务器`
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
    } catch (err) {
        console.log(err)
    }

}