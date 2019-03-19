const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const { PERMISSIONS } = require('../PermissionTypes');

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
    },

    async users(parent, arg, ctx, info) {
        if(!ctx.request.userId) throw new Error('You must be logged in');

        hasPermission(ctx.request.user, [PERMISSIONS.ADMIN, PERMISSIONS.PERMISSION_UPDATE]);

        return ctx.db.query.users({}, info);
    }
};

module.exports = Query;
