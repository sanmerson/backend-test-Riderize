import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Context } from "../context";
import { CreateSubscriptionSchema, Subscription, UpdateSubscriptionSchema } from "../Schemas/subscription.schemas";

@Resolver()
export class SubscriptionResolver{

    @Query((returns)=>[Subscription])
    async Subscriptions(@Ctx() ctx: Context){
        return await ctx.prisma.subscription.findMany({include:{users:true, rides: true}})
    }

    @Query((returns)=>[Subscription])
    @Authorized()
    async SubscriptionsById(@Arg("id") id : string,@Ctx() ctx: Context){
        const user =  await ctx.prisma.users.findUnique({where:{id : id}})

        if (!user) {
            throw new Error(`User not found`)
        }

        return await ctx.prisma.subscription.findMany({where: {userId: id}})
    }

    @Mutation((returns)=>Subscription)
    @Authorized()
    async CreateSubscriptions(@Arg("data") data : CreateSubscriptionSchema, @Ctx() ctx: Context ) : Promise<Subscription>{
        const user = await ctx.prisma.users.findUnique({where:{id : data.userId}})
        const ride = await ctx.prisma.rides.findUnique({where:{id: data.rideId}})

        if(!ride || !user){
            throw new Error(`Ride or User not found`)
        }

        if(ride.end_date_registration < data.subscription_date){
            throw new Error(`Registration period is over`)
        }

        return await ctx.prisma.subscription.create({data: {...data}})
    }

    @Mutation((returns)=>Subscription)
    @Authorized()
    async RemoveSubscription(@Arg("id") id : string,  @Ctx() ctx: Context){
        const subscription = await ctx.prisma.subscription.findUnique({where:{id : id}})

        if(!subscription){
            throw new Error(`Subscription not found`)
        }

        await ctx.prisma.subscription.delete({where:{id:id}})
    }

    @Mutation((returns)=>Subscription)
    @Authorized()
    async UpdateSubscription(@Arg("data") data : UpdateSubscriptionSchema,  @Ctx() ctx: Context): Promise<Subscription>{
        const subscription = await ctx.prisma.subscription.findUnique({where:{id : data.id}})

        if(!subscription){
            throw new Error(`Subscription not found`)
        }

        return await ctx.prisma.subscription.update({where:{id : subscription.id}, data : {...data}})
    }
}