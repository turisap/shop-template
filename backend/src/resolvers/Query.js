const { forwardTo } = require('prisma-binding');

const Query = {
    items : forwardTo('db'),
    item : forwardTo('db'),
    itemsConnection : forwardTo('db'),

    /**
     * Gets a current user
     */
    me(parent, arg, ctx, info) {
        const userId = ctx.request.userId;
        if(!userId) return null;
        return ctx.db.query.user(
            {
                where : { id : userId }
            },
            info
        )
    }
};

module.exports = Query;
