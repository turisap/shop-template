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
      },

      updateItem(parent, args, ctx, info) {
          // get a copy of data for upand revome id because we don't need to update it
          const updates = {...args};
          delete updates.id;
          return ctx.db.mutation.updateItem({
              data : updates,
              where : {
                  id : args.id
              }
          }, info)
      }
};

module.exports = mutations;
