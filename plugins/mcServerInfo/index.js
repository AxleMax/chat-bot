const mcServerUtil = require('minecraft-server-util');

const mcStatus = async (host, port, r) => {
    try {
        console.log(3, r)
        if (r == 1) {
            const status = await mcServerUtil.status(host, port);
            return {
                ok: 1,
                data: status
            };
        } else if (r == 2) {
            console.log(host, port)
            const status = await mcServerUtil.statusBedrock(host, port);
            console.log(status)
            return {
                ok: 1,
                data: status
            };
        } else {
            return { ok: -2, data: 'Invalid argument' }
        }

    } catch (err) {
        return { ok: -1, data: 'Server is offline or unreachable' }
    }
}

module.exports = (qBot) => {
    qBot.on('group', async (data) => {
        if (data?.raw_message?.includes('/info')) {
            const args = data.raw_message.split(' ')
            const r = args[2] || 1
            const { host, port } = mcServerUtil.parseAddress(args[1])
            const status = await mcStatus(host, port, r);
            console.log(status)
            if (status.ok === 1) {

                const statusString = `
                Server Status:
                MOTD: ${status.data.motd.clean}
                Version: ${status.data.version.name}
                Ping: ${status.data.roundTripLatency || 0} ms
                Players Online: ${status.data.players.online}
                Max Players: ${status.data.players.max}
                        `;

                console.log(statusString)
                const msg = status.data.favicon ? [{ type: 'image', data: { file: status?.data?.favicon } }, { type: 'text', data: { text: statusString } }] : [{ type: 'text', data: { text: statusString } }];
                qBot.sdk.send_group_msg(
                    data.group_id,
                    msg
                )
            } else if (status.ok === -1) {
                qBot.sdk.send_group_msg(
                    data.group_id,
                    [{ type: 'text', data: { text: status.data } }]
                )
            }

        }
    })
}