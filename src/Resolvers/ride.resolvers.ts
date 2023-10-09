import { Arg, Mutation, Query, Resolver } from "type-graphql"
import  {Ride}  from "../entities/ride.entities"
import { CreateRideSchema } from "../Schemas/ride.schemas";

@Resolver()
export class rideResolver{
  
    @Query(()=>[Ride])
    rides(){
        return Ride.find()
    }

    @Mutation(()=>Ride)
    async createRide(
        @Arg("data") data : CreateRideSchema
    ){
        //Nessa função quando envio os dados para a API ela da esse erro: unknownValue": "an unknown value was passed to the validate function"
        const newRide = Ride.create(data);
        await Ride.save(newRide);
        return newRide;
    }
}
