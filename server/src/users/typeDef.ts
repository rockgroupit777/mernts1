const userTypeDef = `
extend type Query {
    user(userId: ID!): User!
    users: [User!]!
  }
  extend type Mutation {
    signUp(createUserInput: CreateUserInput): AuthData!
    signIn(email: String!, password: String!): AuthData!
    updateUser(userId: ID!, updateUserInput: UpdateUserInput): User!
  }
  extend type Subscription {
    userAdded: User
  }
  type User {
    _id: ID!
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    avatar: String
    role: Role
    permissions: [String]
    createdAt: String
    updatedAt: String
  }
  type AuthData {
    userId: ID!
    firstName: String
    lastName: String
    role: Role!
    permissions: [String]
    token: String!
    tokenExpiration: Int!
  }
  enum Role {
    SUPERADMIN
    ADMIN
    MEMBER
  }
  input CreateUserInput {
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    repeatPassword: String!
    avatar: String
  }
  input UpdateUserInput {
    firstName: String
    lastName: String
    password: String
    repeatPassword: String
    avatar: String
  }
`
export default userTypeDef