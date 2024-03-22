const { User, Book } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate('savedBooks').populate({
                path: 'savedBooks',
                populate: 'authors'
            });
        },

        books: async () => {
            return await Book.find({}).populate('authors');
        }


    }
};

module.exports = resolvers;