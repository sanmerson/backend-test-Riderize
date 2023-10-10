import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { rideResolver } from "./Resolvers/ride.resolvers";
import { userResolver } from "./Resolvers/userResolver";
import { SubscriptionResolver } from "./Resolvers/subscription.resolvers";
import AuthenticationConfirm from "./Middlewares/authVerificator";
import { PrismaClient } from "@prisma/client";


const app =async () => {
  const prisma = new PrismaClient()
  const schema = await buildSchema({
    resolvers: [rideResolver, userResolver, SubscriptionResolver],
    validate: { forbidUnknownValues: false },
    authChecker : AuthenticationConfirm,
  })

  const server = new ApolloServer({
    schema: schema, context:({ req }) => {
      const context = {
        req,
        prisma,
        token: req?.headers?.authorization
      }

      return context;
    }
  })
  
  server.listen({ port: 4000 }, () => console.log('Server is running on port 4000'))

}

app()