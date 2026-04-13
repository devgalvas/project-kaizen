-- CreateEnum
CREATE TYPE "DifficultyEnum" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "AreaEnum" AS ENUM ('INTELLECTUAL', 'PHYSICAL', 'SPIRITUAL');

-- CreateEnum
CREATE TYPE "RarityEnum" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('WHATSAPP', 'EMAIL', 'SMS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "currentXP" INTEGER NOT NULL DEFAULT 0,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 20,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" "RarityEnum" NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "medal" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "unlockedAt" TIMESTAMP(3),
    "unlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "difficulty" "DifficultyEnum" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "streak" INTEGER DEFAULT 0,
    "lastCheckedIn" TIMESTAMP(3),
    "area" "AreaEnum",
    "userId" TEXT NOT NULL,
    "missionId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "taskId" TEXT NOT NULL,
    "coinReward" INTEGER NOT NULL,
    "isDaily" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "SkillTree" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" "AreaEnum" NOT NULL,
    "unlockedNodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "totalNodes" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SkillTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserFriends_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_InventoryToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InventoryToItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AchievementToInventory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AchievementToInventory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_key" ON "Inventory"("userId");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "_UserFriends"("B");

-- CreateIndex
CREATE INDEX "_InventoryToItem_B_index" ON "_InventoryToItem"("B");

-- CreateIndex
CREATE INDEX "_AchievementToInventory_B_index" ON "_AchievementToInventory"("B");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("taskId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTree" ADD CONSTRAINT "SkillTree_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFriends" ADD CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFriends" ADD CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToItem" ADD CONSTRAINT "_InventoryToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToItem" ADD CONSTRAINT "_InventoryToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToInventory" ADD CONSTRAINT "_AchievementToInventory_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToInventory" ADD CONSTRAINT "_AchievementToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
