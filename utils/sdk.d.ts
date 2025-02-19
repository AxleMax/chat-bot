// sdk.d.ts
export class SDK {
    bot: any;  // 如果你有更详细的 `qBot` 类型定义，可以替换 `any` 为具体类型

    constructor(qbot: any);  // 构造函数
    generateEcho(): string;  // 方法声明
    send(ctx: any): void;
    send_private_msg(id: number, msg: string): Promise<void>;
    send_group_msg(id: number, msg: string): Promise<void>;
    get_group_list(): void;
    loadPlugin(plugin: string): void;
}

// 如果你希望导出一个函数，初始化并挂载 SDK
export default (qBot: any) => {
    qBot.sdk = new SDK(qBot);
};
