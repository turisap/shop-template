const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const { PERMISSIONS, ALLOWED_DELETE_ITEMS } = require('../PermissionTypes');


const Mutations = {

    async createItem(parent, args, ctx, info) {
        // TODO check if user is logged in
        if(!ctx.request.userId) throw new Error('You must be logged in to do this');
        console.log(ctx.request)
        const item = await ctx.db.mutation.createItem({
            data: {
                // this is the relationships between user and item
                user : {
                    connect : {
                        id : ctx.request.userId
                    }
                },
                ...args
            }
        }, info);
        return item;
    },



    updateItem(parent, args, ctx, info) {
        const updates = {...args};
        delete updates.id;
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    },



    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        // find the item
        const item = await ctx.db.query.item({where}, `{ id title user { id } }`);
        // check permissions
        const ownsItem = ctx.request.userId === item.user.id;
        const hasPermissions = ctx.request.user.permissions.some(permission => {
            ALLOWED_DELETE_ITEMS.includes(permission)
        });

        if(!ownsItem && hasPermissions) {
            throw new Error('You are not allowed to do that');
        }
        // delete it
        return ctx.db.mutation.deleteItem({where}, info);
    },



    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: {set: ['USER']}
            }
        }, info);

        _signInWithToken(ctx, user, 14);
        return user;
    },




    async signin(parent, {email, password}, ctx, info) {
        const user = await ctx.db.query.user({where: {email}});
        if (!user) throw new Error(`There is no such a user for this ${email}`);


        const validUser = await bcrypt.compare(password, user.password);
        if (!validUser) throw new Error('Wrong password');

        _signInWithToken(ctx, user, 14);
        return user;
    },




    signout (parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'GoodBuy'}
    },



    async requestReset(parent, args, ctx, info) {
        const user = _getUser(ctx, args.email);
        if (!user) throw new Error(`There is no such a user for this ${args.email}`);

        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        const res = await ctx.db.mutation.updateUser({
            where : { email : args.email },
            data  : {
                resetToken,
                resetTokenExpiry
            }
        });

        const resRequest = await transport.sendMail({
            from : process.env.MAIL_OWNER_ADDRESS,
            to : args.email,
            subject : 'Your password reset link',
            html : makeANiceEmail(`Your password reset token is here!
            <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset your Password</a>`)
        });
      
        return {message : "Goodbuy"}
    },



    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword) throw new Error("Your passwords does not match");

        const [user] = await ctx.db.query.users({
            where : {
                resetToken : args.resetToken,
                resetTokenExpiry_gte : Date.now() - 3600000
            }
        });

        if(!user) throw new Error("This reset token is either expired or invalid");

        const password = await bcrypt.hash(args.password, 10);

        const updatedUser = ctx.db.mutation.updateUser({
            where : { email : user.email },
            data  : {
                password,
                resetToken : null,
                resetTokenExpiry: null
            }
        });

        _signInWithToken(ctx, updatedUser, 2);

        return updatedUser;
    },

    async updatePermissions (parent, args, ctx, info) {
        if (!ctx.request.userId) throw new Error('You must be logged in');
        const user = await ctx.db.query.user({
            where : {
                id : ctx.request.userId
            }
        }, info);

        console.log("USER", user);
        if (user) {
            hasPermission(user, [PERMISSIONS.ADMIN, PERMISSIONS.PERMISSIONUPDATE]);

            // wer use "set" for permissions because it is ENUM type
            return await ctx.db.mutation.updateUser({
                data : {
                    permissions: {
                        set : args.permissions
                    }
                },
                where : {
                    id : args.userId
                }
            }, info)
        }
    }
};


/**
 * Creates a token based on user's id and sets a cookie with it
 * @param ctx
 * @param user
 * @param days
 * @private
 */
const _signInWithToken = (ctx, user, days) => {
    const token = jwt.sign({userId : user.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * days
    });
};

const _getUser = async (ctx, email) => await ctx.db.query.user({where: {email}});


module.exports = Mutations;
