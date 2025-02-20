
module.exports = (bot) => {
    bot.on('message', (data) => {
        console.log('like', JSON.stringify(data))
        console.log('1 records', bot.records)
        if (bot.sdk.findK(data.message, '/赞我').length > 0) {
            bot.records.push({
                message_type: data.message_type,
                group_id: data.group_id || "",
                sender: data.sender,
                echo: bot.sdk.like(data.user_id, 10)
            })
        }

        if (bot.records.length > 0 && bot.records.some(v => v.echo === data.echo)) {
            const record = bot.records.filter(v => v.echo === data.echo)[0]
            console.log(record)
            const msg = data.status === 'failed' ? '爪巴' : [{ "type": "face", "data": { "id": "424" } }, { "type": "face", "data": { "id": "333" } }, { "type": "text", "data": { "text": "➕10" } }]

            if (record.message_type === 'group') {
                bot.sdk.send_group_msg(record.group_id, msg)    
            }
            if (record.message_type === 'private') {
                bot.sdk.send_private_msg(record.sender.user_id, msg)
            }
            bot.records.splice(bot.records.findIndex(v=>v.echo===data.echo), 1)
        }
        console.log('2 records', bot.records)
    })
}