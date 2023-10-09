import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { User } from "../entities/user.entities";
import { CreateUserSchema } from "../Schemas/user.schemas";


@Resolver()
export class userResolver{
  
    @Query(()=>[User])
    User(@Arg("id") id : string){
        return User.findOneBy({id : id})
    }

    @Mutation(()=>User)
    async createUser(
        @Arg("data") data : CreateUserSchema
    ){
        //Esta com erro nessa linha: Argument of type 'CreateUserSchema' is not assignable to parameter of type 'DeepPartial<User>[]'
        const newUser = User.create(data);
        await User.save(newUser);
        return newUser;
    }
}
