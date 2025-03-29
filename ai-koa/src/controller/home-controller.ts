import { CozeAPI, COZE_COM_BASE_URL, ChatStatus, RoleType, ChatEventType } from '@coze/api';
import { Readable, PassThrough } from 'stream';

/**
 * Controller用于接受数据、返回数据给前端
 */
import { Context } from 'koa';
import homeService from '../service/home-service';

const client = new CozeAPI({
  token: 'pat_wCbGI4kJlNHR1Orl6pfccS2w2YH68lz0ijOPZCYiiuWnH613JSsyZUQRlGzzjaGa', // Get your PAT from https://www.coze.com/open/oauth/pats
  // or
  // token: async () => {
  //   // refresh token if expired
  //   return 'your_oauth_token';
  // },
  baseURL: 'https://api.coze.cn',
});

async function quickChat() {
  const v = await client.chat.createAndPoll({
    bot_id: '7481546866170789926',
    additional_messages: [{
      role: RoleType.User,
      content: 'coze和chatgpt有什么优势',
      content_type: 'text',
    }],
  });

    if (v.chat.status === ChatStatus.COMPLETED) {
      return v.messages;
  }
}

export const stream = async (ctx: Context) => {
  ctx.res.setHeader('Content-Type', 'text/event-stream');
  ctx.res.setHeader('Cache-Control', 'no-cache, no-transform');
  ctx.res.setHeader('Connection', 'keep-alive');
  ctx.res.setHeader('X-Accel-Buffering', 'no'); 
  
  const stream = new PassThrough();
  ctx.body = stream;
  ctx.status = 200;

  const chat = await client.chat.stream({
    bot_id: '7481546866170789926',
    additional_messages: [{
      role: RoleType.User,
      content: (ctx.request.body as any).message,
      content_type: 'text',
    }],
  });

  for await (const part of chat) {
    console.log('data:', part.event);
    if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
      console.log('data:', part.data);
      ctx.res.write(part.data.content || (part.data as any).reasoning_content);
    }
  }
  ctx.res.end();
  stream.end();
};


/**
 * 返回hello world
 * @param ctx
 */
export const hello = async (ctx: Context) => {
  const res = await quickChat();
  ctx.body = res;
};

/**
 * 接收name处理后返回给前端
 * @param ctx
 */
export const helloName = async (ctx: Context) => {
  const { name } = ctx.params;
  const res = await homeService.helloName(name);
  ctx.body = res;
};

/**
 * 返回query参数
 * 如：/info?name=jack&age=32
 * ctx.query => { name: 'jack', age: '32' }
 * @param ctx
 */
export const getPersonInfo = async (ctx: Context) => {
  const queryParams = ctx.query;
  const res = await homeService.getPersonInfo(queryParams);
  ctx.body = res;
};

/**
 * 接收post请求，并获取参数
 * @param ctx
 */
export const postTest = async (ctx: Context) => {
  const params = ctx.request.body;
  const res = await homeService.postTest(params);
  ctx.body = res;
};
