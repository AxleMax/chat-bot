const cron = require('node-cron')
const path = require('path')
const fs = require('fs')

const basePath = path.join(process.cwd(), 'configs')
const configPath = path.join(basePath, 'crons.json')
if (!fs.existsSync(configPath)) {
    const config = JSON.stringify(
        {
            "schedules": [
                {
                    "cron": "* * * * * *",
                    "command": [

                    ],
                    "once": true
                }
            ]
        }
        , null, 2)
    fs.writeFileSync(configPath, config, 'utf-8')
    console.log('crons.json中填写定时任务')
}
const crontabs = require(configPath)
if (crontabs && crontabs.schedules && crontabs.schedules.length > 0) {
    crontabs.schedules.forEach(item => {
        item.hasRun = true
        item.currentIndex = 0

        cron.schedule(item.cron, () => {
            if (item.hasRun) {
                for (let i of item.command) {
                    if (typeof i === 'function') {
                        i()
                    }
                }
                if (item.once) {
                    item.hasRun = false
                }
            }
        })
    })
}


const addCron = (cron, command) => {
    crontabs.find(item => item.cron === cron)
    if (cron) {
        console.log('该定时任务已存在')
        return
    }
    crontabs.push({
        cron,
        command
    })
    fs.writeFileSync(configPath, JSON.stringify(crontabs, null, 2), 'utf-8')
}

module.exports = (bot) => {
    bot.cron = cron
    bot.on('message', (data) => {
        console.log(data)
    })
}