const cron = require('node-cron');

let once = false;  // 确保once变量在外部控制

const task = cron.schedule('* * * * * *', () => {
    console.log('Task running every minute');

    if (once) {
        once = false;  // 修改once状态

        setTimeout(() => {
            task.stop();   // 停止定时任务

            console.log('Task stopped and destroyed');
        }, 0);

    }
});

setTimeout(() => {
    once = true
}, 5000);