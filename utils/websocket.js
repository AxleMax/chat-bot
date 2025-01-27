
class qBot {
    constructor(url) {
        this.url = url
        this.ws = null
        this.handlers = []
        this.plugins = []
        this.configs = null
        this.init()
    }
    loadPlugins(plugins) {

    }
    on(event, handler) {
        this.handlers.push({ event, callback: handler })
    }
    emit(event, data) {
        this.handlers.filter(item => item.event === event).forEach(item => item.callback(data))
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
        this.configs = require(`${process.cwd()}\\configs\\configs.json`)
        const WebSocket = require('ws');
        this.ws = new WebSocket('ws://192.168.3.102:3001');
        this.ws.on('open', () => {
            console.log('WebSocket 连接已建立');
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