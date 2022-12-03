const postTypeDef = `
extend type Query {
    post(postId: ID!): Post!
    posts: [Post!]!
  }
  extend type Mutation {
    createPost(createPostInput: CreatePostInput): Post!
    updatePost(postId: ID!, updatePostInput: UpdatePostInput): Post!
  }
  extend type Subscription {
    postAdded: Post
  }
  type Post {
    _id: ID!
    title: String!
    alias: String!
    summary: String!
    content: String!
    cover: String
    photos: [String]
    userId: ID!
    status: Boolean
    likes: [User]
    commentStatus: Boolean
  }
  input CreatePostInput {
    title: String!
    alias: String!
    summary: String!
    content: String!
    cover: String
    photos: [String]
    userId: ID!
    status: Boolean
    likes: [ID]
    commentStatus: Boolean
  }
  input UpdatePostInput {
    title: String!
    alias: String!
    summary: String!
    content: String!
    cover: String
    photos: [String]
    userId: ID!
    status: Boolean
    likes: [ID]
    commentStatus: Boolean
  }
`
export default postTypeDef;