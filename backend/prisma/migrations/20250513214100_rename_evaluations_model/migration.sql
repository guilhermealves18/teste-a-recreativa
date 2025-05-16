/*
  Warnings:

  - You are about to drop the `Avaluations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Avaluations";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonPlanId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "Evaluations_lessonPlanId_fkey" FOREIGN KEY ("lessonPlanId") REFERENCES "LessonPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
