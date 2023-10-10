import { Field, InputType, ID, ObjectType } from "type-graphql";
import { IsEmail} from "class-validator";
import { type } from "os";

@ObjectType()
export class Token{
  @Field((type)=>String, {nullable: true})
  token: string;
}


@ObjectType()
export class User{
  @Field((type) => ID)
  id: string;

  @Field((type)=>String)
  name: string;
  
  @Field()
  @IsEmail()
  email: string;

  @Field((type)=>String)
  password: string;
}

@ObjectType()
export class UserNoPasswordSchema{
  @Field((type) => ID)
  id: string;
  
    @Field((type)=>String)
    name: string;
    
    @Field()
    @IsEmail()
    email: string;
}

@InputType()
export class CreateUserSchema{
    @Field((type)=>String)
    name: string;
    
    @Field()
    @IsEmail()
    email: string;

    @Field((type)=>String)
    password: string;
  }

@InputType()
export class UpdateUserSchema{
    @Field((type) => ID)
    id: string;

    @Field((type)=>String, {nullable: true})
    name?: string;
    
    @Field({nullable: true})
    @IsEmail()
    email?: string;

    @Field((type)=>String,{nullable: true})
    password?: string;
  }

  @InputType()
export class SingupUserSchema{
    @Field()
    @IsEmail()
    email: string;

    @Field((type)=>String)
    password: string;
  }

