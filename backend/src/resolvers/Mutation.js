const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if a user is logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  }
};

module.exports = mutations;
