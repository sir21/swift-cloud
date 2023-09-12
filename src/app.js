const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./router");
const App = new Koa();

App.use(parser()).use(cors()).use(router.routes());

module.exports = {
  App,
};
