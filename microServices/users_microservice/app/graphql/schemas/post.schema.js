export default  `

type Post{
    _id: ID!
    by: User
    likedBy: [User]
    desc: String
    photo: String
    fullname: String!
    email: String!
    comments :[User]
    createdAt: String
}

input iBy{
    username: String!
    thumbnail: String
}

input iPost{
    desc: String
    photo: String
}

type Query{
    getPost(_id: ID!): Post!
}

type Mutation{
    createPost(post: iPost): Post!
}
`;
