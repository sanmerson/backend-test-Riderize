import { Field, ID, ObjectType, } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from "typeorm";
import { RideToUser } from "./ridetouser.entities";
  
  @Entity("rides")
  @ObjectType()
  export class Ride extends BaseEntity {
    @Field(()=>ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    start_date: Date;

    @Field()
    @Column()
    start_date_registration: Date;

    @Field()
    @Column()
    end_date_registration: Date;

    @Field({nullable: true})
    @Column({nullable: true})
    additional_information: string;

    @Field()
    @Column()
    start_place: string;

    @Field({nullable: true})
    @Column({nullable: true})
    participants_limit: number;

    @OneToMany(()=>RideToUser, (rideUsers) => rideUsers.ride)
    rideUsers : RideToUser[];

  }
  
 
