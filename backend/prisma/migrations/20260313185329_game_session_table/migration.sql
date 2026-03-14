-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('MEMORY', 'ATTENTION', 'PROCESSING_SPEED', 'EXECUTIVE_FUNCTIONS', 'REASONING');

-- DropIndex
DROP INDEX "User_hash_key";

-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "correct" INTEGER NOT NULL,
    "incorrect" INTEGER NOT NULL,
    "reactionTimeAvg" DOUBLE PRECISION NOT NULL,
    "reactionTimeStd" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "domain" "Domain" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
