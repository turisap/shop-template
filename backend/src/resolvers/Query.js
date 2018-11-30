const { forwardTo } = require("prisma-binding");

const Query = {
  // this is for creating a query in a easy way by just forwarding it to the prisma.graphql
  items: forwardTo("db"),
  item : forwardTo("db"),
  itemsConnection : forwardTo("db"),
  // async items (parent, args, ctx, info) {
  //     // console.log('getting items');
  //     // const item = await ctx.db.query.items();
  //     // return item;
  // }
};

module.exports = Query;
