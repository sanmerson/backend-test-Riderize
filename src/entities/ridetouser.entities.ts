import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Ride } from "./ride.entities";
import { User } from "./user.entities";

@Entity('ride_user')
export class RideToUser extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    subscription_date: Date;

    @ManyToOne(()=> User, (user) => user.rideUsers)
    user : User

    @ManyToOne(()=> Ride, (ride) => ride.rideUsers)
    ride : Ride
}