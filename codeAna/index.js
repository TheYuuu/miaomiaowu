const path = require('path');
const fs = require('fs');
const Koa = require('koa')
const compress = require('koa-compress')
const Router = require('koa-router')
const cors = require('@koa/cors')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')

const {
  getData
} = require('./lib/core');

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())
app.use(compress())

var filePath = path.resolve('./data');
let { root, nodes, edges } = getData(filePath);

router.get('/getRoot', (ctx, next) => {
  try {
    ctx.body = {
      root: root
    };
  } catch (e) {
    console.log(e)
    next(e)
  }
});

router.get('/getNodeLink', (ctx, next) => {
  try {
    ctx.body = {
      "nodes": nodes,
      "links": edges
    };
  } catch (e) {
    console.log(e)
    next(e)
  }
});

router.get('/getFileContent', (ctx, next) => {
  try {
    let query = ctx.query.filePath;
    let data = fs.readFileSync(query).toString();
    ctx.body = {
      "code": data,
      "title": query.replace(filePath, '')
    };
  } catch (e) {
    console.log(e)
    next(e)
  }
});

router.post('/editFile', async (ctx, next) => {
  try {
    let postData = ctx.request.body.data;
    let status = 1;
    let errInf = null;
    await fs.writeFile(postData.filePath, postData.content,  function(err) {
      if (err) {
        status = 0;
        message = '写入失败';
        errInf = err;
        return console.error(err);
      }
   });

    ctx.body = {
      'message': '写入成功',
      'status': status,
      'errInf': errInf
    };
  } catch (e) {
    console.log(e)
    next(e)
  }
});


app.use(router.routes())

app.listen(4000);