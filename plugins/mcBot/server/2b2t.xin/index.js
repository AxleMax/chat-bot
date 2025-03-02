
const mineflayer = require('mineflayer')
const config = require('./config.json')
const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}
const unlock = async (bot) => {
    return new Promise(async (resolve, reject) => {
        const compass = bot.inventory.items().find(item => item.name === 'compass')
        if (compass) {
            bot.equip(compass, 'hand')
            await bot.activateItem()
            console.log('成功使用指南针')
            await sleep(2)
            resolve()
        }
        resolve('背包没有指南针')
    })

}
module.exports = (listen) => {
    return new Promise((resolve, reject) => {
        try {
            const bot = mineflayer.createBot({
                host: '2b2t.xin',
                port: 25565,
                username: config.username
            })

            bot.on('title', async (data) => {
                console.log(data)
                if (data && data?.value.includes('/L <密码>')) {
                    bot.chat(`/L ${config.password}`)
                }
                if (data && data?.value.includes('离线玩家请注册')) {
                    bot.chat(`/reg ${config.password} ${config.password}`)
                }
                if (data && data?.value.includes('登陆成功')) {
                    console.log('登录成功')
                    await sleep(3)
                    await unlock(bot)
                    await sleep(5)
                }
                if (data && data?.value.includes('注册成功')) {
                    console.log('注册成功')
                }
            })
            bot.once('spawn', async () => {
                bot.addChatPattern('any', /\.*/, { deprecate: false });
                console.log(`${bot.username} 已进入游戏`);
                resolve(bot)
            })
            bot.on('chat:any', async (any) => {
                console.log(any)
                listen.emit('chat', any)
                if (any[0].includes('所在的服务器出现故障, 已连接到登录服.' || any[0].includes('无效指令,请输入/help查看帮助！'))) {
                    await unlock(bot)
                    console.log('unlock')
                }
            })
            bot.on('kicked', (reason) => {
                console.log(`被踢出游戏，原因：${JSON.stringify(reason)}`);
                reject(reason)

            });
            bot.on('end', (reason) => {
                console.log(`与服务器断开连接，原因：${JSON.stringify(reason)}`);

            });
            bot.on('error', (err) => {
                reject(err)
            });
        } catch (err) {
            reject(err)
        }
    })
}

