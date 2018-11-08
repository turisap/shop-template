const mutations = {
    createDog(parent, args, context, info) {
        global.dogs = global.dogs || [];
        global.dogs.push({name : args.name})
    }
};

module.exports = mutations;
