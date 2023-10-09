import { Arg, Query, Resolver } from "type-graphql";
import { RideToUser } from "../entities/ridetouser.entities";

@Resolver()
export class rideToUserResolver{

    //Ainda nao esta implementado
    @Query(()=>[RideToUser])
    userRides(@Arg('id') id : string){
    }

}