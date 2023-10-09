import { MigrationInterface, QueryRunner } from "typeorm";

export class addRideTable1696805230039 implements MigrationInterface {
    name = 'addRideTable1696805230039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "start_date" character varying NOT NULL, "start_date_registration" TIMESTAMP NOT NULL, "end_date_registration" TIMESTAMP NOT NULL, "additional_information" character varying, "start_place" character varying NOT NULL, "participants_limit" integer, CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rides"`);
    }

}
