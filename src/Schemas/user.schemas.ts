import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserSchema{
    @Field()
    name: string;
    
    @Field()
    email: string;
  }
  