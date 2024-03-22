// import the graph ql client 

import { gql } from '@apollo/client';

// this is the get me query that is passed from the User typeDefs

export const GET_ME = gql`
    query getMe {
        me {
        _id
        username
        email
        bookCount
        savedBooks
        
        }

    }
    
    `;