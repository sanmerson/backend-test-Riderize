import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from "typeorm";
import { RideToUser } from "./ridetouser.entities";
    
  @Entity("users")
  @ObjectType()
  export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;
    
    @Field()
    @Column({ unique: true })
    email: string;

    @OneToMany(()=>RideToUser, (rideUsers) => rideUsers.user)
    rideUsers : RideToUser[];
  }
  
  