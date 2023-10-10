import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { CreateUserSchema, SingupUserSchema, Token, UpdateUserSchema, User, UserNoPasswordSchema } from "../Schemas/user.schemas";
import { Context } from "../context";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Ride } from "../Schemas/ride.schemas";



@Resolver()
export class userResolver {

    @Query((returns) => UserNoPasswordSchema, { nullable: true })
    @Authorized()
    async User(@Arg("id") id: string, @Ctx() ctx: Context): Promise<UserNoPasswordSchema | null> {
        const user = await ctx.prisma.users.findUnique({ where: { id: id } });

        if (!user) {
            throw new Error(`User not found`);
        }

        return user;
    }

    @Query((returns) => [Ride], { nullable: true })
    @Authorized()
    async UserRides(@Arg("id") id: string, @Ctx() ctx: Context) {
        const user = await ctx.prisma.users.findUnique({ where: { id: id } });

        if (!user) {
            throw new Error(`User not found`);
        }

        return ctx.prisma.rides.findMany({ where: { created_by: user.id } });
    }

    @Mutation((returns) => UserNoPasswordSchema)
    async createUser(@Arg("data") data: CreateUserSchema, @Ctx() ctx: Context): Promise<UserNoPasswordSchema> {
        const hashedPassword = await hash(data.password, 10);
        return await ctx.prisma.users.create({
            data: { ...data, password: hashedPassword }
        });
    }

    @Mutation((returns) => User, { nullable: true })
    @Authorized()
    async removeUser(@Arg("id") id: string, @Ctx() ctx: Context): Promise<void> {
        const user = await ctx.prisma.users.findUnique({ where: { id: id } });
        if (!user) {
            throw new Error(`User not found`);
        }

        await ctx.prisma.users.delete({ where: { id: user.id } });
    }

    @Mutation((returns) => UserNoPasswordSchema, { nullable: true })
    @Authorized()
    async updateUser(@Arg("data") data: UpdateUserSchema, @Ctx() ctx: Context): Promise<UserNoPasswordSchema> {
        const user = await ctx.prisma.users.findUnique({ where: { id: data.id } });

        if (data.password) {
            const hashedPassword = await hash(data.password, 10);
            data = { ...data, password: hashedPassword };
        }

        if (!user) {
            throw new Error(`User not found`);
        }

        return await ctx.prisma.users.update({ where: { id: user.id }, data: { ...data } });
    }

    @Query((returns)=>String)
    async singupUser(@Arg("data")data : SingupUserSchema,  @Ctx() ctx: Context){
        const user = await ctx.prisma.users.findUnique({where:{email: data.email}})

        if(!user){
            throw new Error(`Email ou Password not found`);
        }

        const checkedpassword = compare(user.password, data.password)

        if(!checkedpassword){
            throw new Error(`Email ou Password not found`);
        }


        const token = jwt.sign({},
            String(process.env.SECRET_KEY),
            {
              expiresIn: "24h",
            }
          );

        return token
    }

}
