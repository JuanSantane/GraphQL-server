export default  `

type User{
    _id: ID!
    username: String!
    email: String
    password: String!
    thumbnail: String
}

type Result {
    id: String
}

type Query{
    getAllUsers : [User]!
    getUser(_id: ID!): User!
}

type Mutation{
    createUser(username: String!, password: String!, fullname: String!, email: String!): Boolean!
}

type Subscription {
    somethingChanged: Result
}
`;
