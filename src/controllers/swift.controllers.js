const { responseMapper } = require("../mappers/swift.mapper");
const { getSwiftService } = require("../services/swift.service");

const querySwift = async (ctx) => {
  const query = ctx.request.query;
  try {
    const data = await getSwiftService(query);
    ctx.body = responseMapper(data);
    ctx.status = 200;
  } catch (e) {
    if (e.message.contains("SQLITE_ERROR")) {
      ctx.throw(500);
    }
    ctx.throw(400, e.message)
  }
};

module.exports = {
  querySwift,
};
