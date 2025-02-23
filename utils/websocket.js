const fs = require('fs')
const path = require('path')

class qBot {
    constructor() {
        this.ws = null
        this.handlers = []
        this.plugins = []
        this.config = null
        this.path = process.cwd()
        this.init()
        this.records = []
    }
    once(event, handler) {
        this.handlers.push({ event, callback: handler, once: true })
    }
    on(event, handler) {
        this.handlers.push({ event, callback: handler })
    }
    emit(event, data) {
        this.handlers.filter(item => item.event === event).forEach(item => {
            item.callback(data)
            if (item.once) {
                this.removeListener(event, item.callback)
            }
        })
    }
    removeListener(event, handler) {
        this.handlers = this.handlers.filter(item => {
            return !(item.event === event && item.callback === handler);
        });
    }
    removeAllListeners(event) {
        if (event) {
            this.handlers = this.handlers.filter(item => item.event !== event);
        }
        //  else {
        //     this.handlers = [];
        // }
    }

    init() {
        this.config = JSON.parse(fs.readFileSync(path.join(this.path, 'configs', 'configs.json')))
        const WebSocket = require('ws');
        if (!this.config || !this.config.ws) {
            throw new Error(`The 'ws' property is requiredm,Check the configuration file.`)
        }
        this.ws = new WebSocket(this.config.ws);
        this.ws.on('open', () => {
            console.log('WebSocket 连接已建立');
            this.emit('socketed')
        });

        this.ws.on('message', (data) => {
            const parseData = JSON.parse(data)
            if (parseData.post_type !== 'meta_event') {
                this.emit('message', parseData)
                if (parseData.message_type === 'private') {
                    this.emit('private', parseData)
                }
                if (parseData.message_type === 'group') {
                    this.emit('group', parseData)
                }
            }
        });

        this.ws.on('close', () => {
            console.log('WebSocket 连接已关闭');
        });

        this.ws.on('error', (error) => {
            console.error(`发生错误: ${error}`);
        });
    }
    close() {
        this.ws.close()
    }
}

module.exports = qBot