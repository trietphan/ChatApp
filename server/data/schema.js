export const Schema = [`
  scalar Date

  type Group {
    id: Int!
    name: String
    users: [User]! # Users in a group
    messages: [Message] # Message sent to the group
  }

  type User {
    id: Int!
    email: String!
    username: String
    messages: [Message]
    groups: [Group]
    friends: [User]
  }

  type Message {
    id: Int!
    to: Group!
    from: User!
    text: String!
    createdAt: Date!
  }

  type Query {
    user(email: String, id: Int): User

    group(id: Int!): Group

    messages(groupId: id, userId: id): [Message]
  }

  schema {
    query: Query
  }
`];

export default Schema;
