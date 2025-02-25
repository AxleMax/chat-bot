const cron = require('node-cron')
const path = require('path')
const fs = require('fs')

class CRON {
    constructor(bot) {
        this.bot = bot
        this.flag = true
        this.crontabs = null
        this.runningCron = []
        this.init()
    }

    init() {
        const configPath = path.join(this.bot.path, 'configs', 'crons.json')
        if (!fs.existsSync(configPath)) {
            const config = JSON.stringify(
                {
                    "schedules": [
                        {
                            "cronName": "test",
                            "time": "* * * * * *",
                            "plugin": "test",
                            "method": "test",
                            "args": {
                                "once": true,
                                "repeat": 1
                            }
                        }
                    ]
                }
                , null, 2)
            fs.writeFileSync(configPath, config, 'utf-8')
            this.flag = false
        }
        if (!this.flag) throw new Error('重新生成crons.json，填写定时任务，重新加载')
        //auto load config crontabs
        this.crontabs = JSON.parse(fs.readFileSync(configPath))
        if (this.crontabs && this.crontabs.schedules && this.crontabs.schedules.length > 0) {
            for (const item of this.crontabs.schedules) {
                if (!(item.cronName && item.cronTime && item.plugin && item.method && item.args)) {
                    console.log(`定时任务${item.cronName}配置有误，缺少必要参数`);
                    continue;
                }
                const result = this.addCron(item.cronName, item.cronTime, item.plugin, item.method, item.args);
                console.log(result)
                if (result.status) {
                    console.log(`定时任务${item.cronName}添加成功`)
                } else {
                    console.warn(`定时任务${item.cronName}添加失败>>${result.msg}`)
                }

            }
            console.log(`共计加载${this.runningCron.length}个定时任务`)
        }
    }
    addCron(cronname, crontime, plugin, method, args = {}) {
        console.log(cronname, crontime, plugin, method, args)
        if (this.runningCron.find(item => item.name === cronname)) return { status: false, msg: "该定时任务已存在" }
        if (!(plugin in this.bot.plugins)) return { status: false, msg: "插件不存在" }
        if (!(method in this.bot.plugins[plugin])) return { status: false, msg: "方法不存在" }
        if (typeof this.bot.plugins[plugin][method] !== 'function') return { status: false, msg: "方法不是有效函数" }
        if (typeof args !== 'object') return { status: false, msg: "参数不是有效对象" }
        //add2cron
        const { once = false, repeat = 1, ...restArgs } = args
        if (!crontime) return { status: false, msg: "定时任务时间不能为空" }
        const job = cron.schedule(crontime, async () => {
            try {
                await this.bot.plugins[plugin][method](restArgs)
                if (once) {
                    job.stop()
                    this.runningCron.splice(this.runningCron.findIndex(item => item.name === cronname), 1)
                }
            } catch (error) {
                console.error(error)
            }
        })

        this.runningCron.push({
            name: cronname,
            cron: job
        })

        //add success
        return { status: true, msg: "添加成功" }
    }
    deleteCron(cronname) {
        const result = this.stopCron(cronname)
        if (result.status) {
            this.runningCron.splice(this.runningCron.findIndex(item => item.name === cronname), 1)
        }
        return { stauts: true, msg: "删除成功" }
    }
    stopCron(cronname) {
        const cron = this.runningCron.find(item => item.name === cronname)
        if (!cron) return { status: false, msg: "该定时任务不存在" }
        cron.stop()
        return { status: true, msg: "停止成功" }
    }
}

module.exports = (bot) => {
    bot.plugins.cron = new CRON(bot)
    bot.sdk.send_private_msg('123',[])
    bot.on('message', (data) => {
        console.log(data)
    })
}
