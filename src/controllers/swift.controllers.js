const { getSwiftService } = require("../services/swift.service");

const querySwift = async (ctx) => {
  const query = ctx.request.query;
  try {
    const data = await getSwiftService(query);
    ctx.body = data;
    ctx.status = 200;
  } catch (e) {
    console.log(e);
    ctx.status = 504;
  }
};

module.exports = {
  querySwift,
};
