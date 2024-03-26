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
        login: async (parent, { email, password }, context) => {
            const user = await context.loginUser(email, password);
            const token = context.signToken(user);
            return {
                user,
                token,
            };
        },
        addUser: async (parent, { username, email, password }, context) => {
            const newUser = await context.createUser(username, email, password);
            const token = context.signToken(newUser);
            return {
                user: newUser,
                token: token,
            };
        },
        saveBook: async (parent, { input }, context) => {
            const updatedUser = await context.saveBookForUser(input);
            return updatedUser;
        },
        removeBook: async (parent, { bookId }, context) => {
            const updatedUser = await context.removeBookForUser(bookId);
            return updatedUser;
        },
    },
};

module.exports = resolvers;