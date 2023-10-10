import { type } from "os";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Subscription{
    @Field((type)=>ID)
    id: string

    @Field((type)=>String)
    userId: string

    @Field((type)=>String)
    rideId : string

    @Field((type)=>Date)
    subscription_date: Date
}

@InputType()
export class CreateSubscriptionSchema{
    @Field((type)=>String)
    userId: string

    @Field((type)=>String)
    rideId : string

    @Field((type)=>Date)
    subscription_date: Date
}

@InputType()
export class UpdateSubscriptionSchema{
    @Field((type)=>ID)
    id: string

    @Field((type)=>String,{nullable: true})
    userId: string

    @Field((type)=>String,{nullable: true})
    rideId : string

    @Field((type)=>Date,{nullable: true})
    subscription_date: Date
}