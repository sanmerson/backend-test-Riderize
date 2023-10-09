import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { rideResolver } from "./Resolvers/ride.resolvers";
import AppDataSource from "./data-source";
import { userResolver } from "./Resolvers/user.resolvers";

const main =async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  const schema = await buildSchema({
    resolvers: [rideResolver, userResolver] // add this
  })

  const server = new ApolloServer({
    schema: schema,
  })
  
  server.listen({ port: 4000 }, () => console.log('Server is running on port 4000'))

}

main()