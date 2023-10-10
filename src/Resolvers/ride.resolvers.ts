import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { CreateRideSchema, Ride, UpdateRideSchema } from "../Schemas/ride.schemas";
import { Context } from "../context";

@Resolver()
export class rideResolver{
  
    @Query((returns)=>[Ride],{ nullable: true })
    async rides(@Ctx() ctx: Context){
        return await ctx.prisma.rides.findMany()
    }

    @Mutation((returns)=>Ride)
    @Authorized()
    async createRide(@Arg("data") data : CreateRideSchema,  @Ctx() ctx: Context ) : Promise<Ride>{
        return await ctx.prisma.rides.create({
            data : {...data}
        })
    }

    @Mutation((returns)=>Ride, { nullable: true })
    @Authorized()
    async removeRide(@Arg("id") id : string,  @Ctx() ctx: Context ) : Promise<void>{
        const ride =  await ctx.prisma.rides.findUnique({where:{id:id}})
        if(!ride){
            throw new Error(`Ride not found`)
        }

        await ctx.prisma.rides.delete({where : {id : id}})
    }

    
    @Mutation((returns)=>Ride)
    @Authorized()
    async updateRide(@Arg("data") data : UpdateRideSchema,  @Ctx() ctx: Context ) : Promise<Ride>{
        const ride =  await ctx.prisma.rides.findUnique({where:{id : data.id}})
        if(!ride){
            throw new Error(`Ride not found`)
        }

        return await ctx.prisma.rides.update({where:{id : ride.id}, data : {...data}})
    }
}
