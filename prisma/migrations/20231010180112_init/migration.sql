CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "subscription" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "subscription_date" TIMESTAMP(6) NOT NULL,
    "userId" UUID,
    "rideId" UUID,

    CONSTRAINT "PK_5aa9cf38a33da4d5e5a03df37b4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rides" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "start_date_registration" TIMESTAMP(6) NOT NULL,
    "end_date_registration" TIMESTAMP(6) NOT NULL,
    "additional_information" VARCHAR,
    "start_place" VARCHAR NOT NULL,
    "participants_limit" INTEGER,
    "start_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_rideId_key" ON "subscription"("rideId");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_97672ac88f789774dd47f7c8be3" ON "users"("email");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "rides"("id") ON DELETE SET NULL ON UPDATE CASCADE;
