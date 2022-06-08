const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

// const resolvers = {
//   Query: {
//     info: () => `This is the API of a hackernews clone`,
//     feed:  (root, args, context, info) => context.prisma.links(),
//   },
//   Mutation: {
//     post: (parent, args, context) => {
//       return context.prisma.createLink({
//         url: args.url,
//         description: args.description
//       })
//     },
//     updateLink: (parent, args) => {
//       let index = links.findIndex((link) => link.id === args.id)
//       links[index].url = args.url
//       links.description = args.description
//       return links[index]
//     },
//     deleteLink: (parent, args) => {
//       links = links.filter((link) => args.id !== link.id)
//       return null
//     }
//   }
// }

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))