const Router = require("koa-router");
const router = new Router();
const {querySwift } = require('./controllers/swift.controllers');

router.get("/", querySwift);

module.exports = router;