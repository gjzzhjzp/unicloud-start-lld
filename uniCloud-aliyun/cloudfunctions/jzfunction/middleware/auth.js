// const uniID = require("uni-id");
module.exports = (options) => {
  // 初始化 uniID 配置
  // uniID.init(options);
  // 返回中间件函数
  return async function auth(ctx, next) {
    console.log("11111111111",ctx);
    await next(); // 执行后续中间件
  };
};