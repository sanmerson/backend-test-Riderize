import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Ride {
  @Field(()=>ID)
  id: string;

  @Field((type)=>String)
  name: string;

  @Field((type)=>Date)
  start_date: Date;

  @Field((type)=>Date)
  start_date_registration: Date;

  @Field((type)=>Date)
  end_date_registration: Date;

  @Field((type)=>String,{nullable: true})
  additional_information: string | null;

  @Field((type)=>String)
  start_place: string;

  @Field((type)=>Number,{nullable: true})
  participants_limit: number | null ;

  @Field((type)=>String)
  created_by : string;
}

  @InputType()
  export class CreateRideSchema{
    @Field((type)=>String)
    name: string;

    @Field((type)=>Date)
    start_date: Date;

    @Field((type)=>Date)
    start_date_registration: Date;

    @Field((type)=>Date)
    end_date_registration: Date;

    @Field((type)=>String,{nullable: true})
    additional_information: string | null;

    @Field((type)=>String)
    start_place: string;

    @Field((type)=>Number,{nullable: true})
    participants_limit: number | null ;

    @Field((type)=>String)
    created_by : string;
  }
  
  @InputType()
  export class UpdateRideSchema{
    @Field(()=>ID)
    id: string;

    @Field((type)=>String, {nullable: true})
    name?: string;

    @Field((type)=>Date, {nullable: true})
    start_date?: Date;

    @Field((type)=>Date, {nullable: true})
    start_date_registration?: Date;

    @Field((type)=>Date, {nullable: true})
    end_date_registration?: Date;

    @Field((type)=>String, {nullable: true})
    additional_information?: string;

    @Field((type)=>String, {nullable: true})
    start_place?: string;

    @Field((type)=>Number, {nullable: true})
    participants_limit?: number;

    @Field((type)=>String, {nullable: true})
    created_by : string;
  }