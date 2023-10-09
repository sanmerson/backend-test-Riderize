import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserToRide1696843351843 implements MigrationInterface {
    name = 'addUserToRide1696843351843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ride_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subscription_date" TIMESTAMP NOT NULL, "userId" uuid, "rideId" uuid, CONSTRAINT "PK_5aa9cf38a33da4d5e5a03df37b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "start_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride_user" ADD CONSTRAINT "FK_0af97c6581a71ddf3c75038f7f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_user" ADD CONSTRAINT "FK_a4650004298e5d55c428fed5303" FOREIGN KEY ("rideId") REFERENCES "rides"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_user" DROP CONSTRAINT "FK_a4650004298e5d55c428fed5303"`);
        await queryRunner.query(`ALTER TABLE "ride_user" DROP CONSTRAINT "FK_0af97c6581a71ddf3c75038f7f4"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "rides" ADD "start_date" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "ride_user"`);
    }

}
