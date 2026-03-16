/*
  Warnings:

  - Changed the type of `gameName` on the `GameSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameName" AS ENUM ('DIGITAL_SPAN', 'CARD_MATCH', 'SEQUENCE_RECALL', 'VISUAL_SEARCH', 'STROOP_TEST', 'REACTION_TIME', 'GO_NO_GO', 'CHOICE_REACTION_TIME', 'PATTERN_RECOGNITION', 'ARITHMETIC_PATTERN_RECOGNITION');

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "gameName",
ADD COLUMN     "gameName" "GameName" NOT NULL;
