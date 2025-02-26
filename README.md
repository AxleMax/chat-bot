### 基于Napcat websocket通信服务客户端机器人

> WIP\
> 自定义插件

##### 目前实现插件

| 插件名称     | 插件介绍                                 |
| ------------ | ---------------------------------------- |
| crons        | 定时执行各种插件自定义功能               |
| like         | 好友信息卡片点赞功能                     |
| mcServerInfo | 通过ip查询返回服务器图片、在线人数等信息 |

##### 基本目录结构

> ```
> ├─ node_modules
> │  └─ ws
> ├─ plugins
> │  ├─ crons
> │  ├─ like
> │  └─ mcServerInfo
> ├─ resource
> │  └─ pitures
> └─ utils
>    ├─ sdk.js
>    └─ websocket.js
> ```
