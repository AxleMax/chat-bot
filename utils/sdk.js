const fs = require('fs')
const path = require('path')

class SDK {
    constructor(qbot) {
        this.bot = qbot
        this.records = []
    }
    unloadPlugin(pluginName) {
        if (!pluginName) return
        const pluginPath = `${this.bot.path}/plugins/${pluginName}`
        delete require.cache[require.resolve(pluginPath)]
        this.bot.plugins.splice(this.bot.plugins.indexOf(pluginName), 1)
    }
    loadPlugin(pluginName) {
        try {
            if (!pluginName) return
            const pluginPath = `${this.bot.path}/plugins/${pluginName}`
            delete require.cache[require.resolve(pluginPath)]
            const plugin = require(pluginPath)
            plugin(this.bot)
            if (this.bot.plugins.indexOf(pluginName) === -1) {
                this.bot.plugins.push(pluginName)
                console.log(`${pluginName} 加载成功!`)
            } else {
                console.log(`${pluginName} 重新加载成功!`)
            }

        } catch (err) {
            //throw new Error(`${pluginName} 加载失败>>`,err)
            console.log(err)
        }
    }
    loadPlugins(arr = []) {
        if (typeof arr === 'object' && arr.length > 0) {
            for (let i of arr) {
                this.loadPlugin(i)
            }
        } else if (this.bot.config && this.bot.config.plugins.length > 0) {
            for (let i of this.bot.config.plugins) {
                this.loadPlugin(i)
            }
        }
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
    async send_group_msg(id, msg) {

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

    like(id, times) {
        const echo = this.generateEcho()
        const ctx = {
            action: 'send_like',
            params: {
                "user_id": id,
                "times": times
            },
            echo: echo
        }
        this.send(ctx)
        return echo
    }
    baseImg(where, name) {
        if (!where || !name) {
            return console.warn('propety `where` (piture storage type) and `name` is in needed')
        }
        const picUrl = path.join(this.bot.path, 'resource', 'pitures', where, name)
        if (!fs.existsSync(picUrl)) {
            return console.error('file not found')
        }
        const baseData = fs.readFileSync(picUrl).toString('base64')
        const ext = picUrl.split('.').pop().toLowerCase();

        let mimeType = '';
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                mimeType = 'image/jpeg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            case 'gif':
                mimeType = 'image/gif';
                break;
            default:
                mimeType = 'application/octet-stream';
        }

        return `data:${mimeType};base64,${baseData}`;
    }
    findK = (obj, key) => {
        function handle(obj) {
            if (typeof obj === 'object') {
                for (let i in obj) {
                    if (typeof obj[i] === 'object') {
                        if (handle(obj[i])) {
                            return true;
                        }
                    } else if (typeof obj[i] === 'string' && obj[i].includes(key)) {
                        return true;
                    }
                }
            } else if (typeof obj === 'string' && obj.includes(key)) {
                return true;
            }
            return false;
        }
        if (Array.isArray(obj)) {
            return obj.filter(v => handle(v));
        }
        return [];
    }
}

module.exports = (qBot) => {
    qBot.sdk = new SDK(qBot);
}