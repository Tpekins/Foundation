-- AlterTable
ALTER TABLE "AboutUs" ADD COLUMN     "subtitle" TEXT;

-- AlterTable
ALTER TABLE "FieldLog" ADD COLUMN     "metrics" TEXT;

-- AlterTable
ALTER TABLE "Initiative" ADD COLUMN     "category" TEXT;

-- CreateTable
CREATE TABLE "RootsEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Built with our hands, ground to roof.',
    "description" TEXT NOT NULL DEFAULT 'We don''t design solutions on paper — we execute them. This is the permanent archive of our community school''s full construction timeline — from first stone to final beam.',
    "videoTitle" TEXT NOT NULL DEFAULT 'School build, A to Z',
    "youtubeId" TEXT,
    "imageUrls" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RootsEntry_pkey" PRIMARY KEY ("id")
);
