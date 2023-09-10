const { getSwiftService } = require("../services/swift.service");

const querySwift = async (ctx) => {
  const query = ctx.request.query;
  const data = await getSwiftService(query);
  console.log(data);
  ctx.body = data;
  ctx.status = 200;
};

module.exports = {
  querySwift,
};
