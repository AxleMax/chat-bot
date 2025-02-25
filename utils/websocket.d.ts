export class qBot {
    private ws: WebSocket;
    public handlers: Array;
    public plugins: Array;
    private config: Object;
    public path: String;
    private records: Array;
    sdk:SDK
    constructor() {
    }
    init: () => void;
    once: (event:string, handler:function) => void;
    on:(event:string, handler:function) => void;
    emit:(event:string,data?:object) => void;
    removeListener:(event:string, handler:function) => void;
    removeAllListeners:(event:string) => void;
    close:()=>void
}

export function createBot(): qBot;
export function pluginInit(bot:qBot):qBot


export class SDK {
    private static bot: Bot;
    constructor(qbot: Bot){
        this.bot= qbot
    };
    generateEcho(): string;
    send(ctx: any): void;
    send_private_msg(id: number | string, msgArray: Msg[]): Promise<void>;
    send_group_msg(id: number | string, msgArray: Msg[]): Promise<void>;
    get_group_list(): void;
    loadPlugin(plugin: string): void;
    loadPlugins(): void;
    send_auto_msg(payload:Message,msgArray:Msg[]):void
}
export function SDKLOAD(qBot: Bot): void

export type Msg = {type:"text",data:{text:string}} |{type:"image",data:{image_url:string}}|{type:"record",data:{record_url:string}}|{type:"json",data:{json_data:object}}|{type:"face",data:{face_url:string}}|{type:"video",data:{video_url:string}}|{type:"reply",data:{reply_msg:string}}|{type:"music",data:{music_url:string}}|{type:"file",data:{file_url:string}};

export interface Message{
    message_type:string,
    sender:string,
    group_id?:string
}
export interface Bot {
    sdk: SDK;
}
