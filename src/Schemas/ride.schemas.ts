import { Field, InputType, ObjectType } from "type-graphql";
import { Repository } from "typeorm";
import { Ride } from "../entities/ride.entities";

  @InputType()
  export class CreateRideSchema extends Repository<Ride>{
    @Field()
    name?: string;

    @Field()
    start_date?: string;

    @Field()
    start_date_registration?: string;

    @Field()
    end_date_registration?: string;

    @Field({nullable: true})
    additional_information?: string;

    @Field()
    start_place?: string;

    @Field({nullable: true})
    participants_limit?: number;
  }
  
