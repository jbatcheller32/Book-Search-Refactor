const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async () => {
            return await User.find({}).populate('savedBooks').populate({
                path: 'savedBooks',
                populate: { path: 'authors' }
            });
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.loginUser(email, password);
            const token = signToken(user);
            return {
                user,
                token,
            };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { input }, { user }) => {
            if (!user) {
                throw new Error('You must be logged in to save a book.');
            }
            const updatedUser = await User.saveBookForUser(input);
            return updatedUser;
        },
        removeBook: async (parent, { bookId }) => {
            const updatedUser = await User.removeBookForUser(bookId);
            return updatedUser;
        },
    },
};

module.exports = resolvers;