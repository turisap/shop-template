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
          // get a copy of data for updates and revome id because we don't need to update it
          const data = {...args};
          delete data.id;
          return ctx.db.mutation.updateItem({
              data : updates,
              where : {
                  id : args.id
              }
          }, info)
      }
};

module.exports = mutations;
