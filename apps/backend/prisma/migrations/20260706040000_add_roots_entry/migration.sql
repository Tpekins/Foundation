-- CreateTable
CREATE TABLE "RootsEntry" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL DEFAULT 'build',
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT 'Built with our hands, ground to roof.',
    "description" TEXT NOT NULL DEFAULT 'We don''t design solutions on paper — we execute them. This is the permanent archive of our community school''s full construction timeline — from first stone to final beam.',
    "videoTitle" TEXT NOT NULL DEFAULT 'School build, A to Z',
    "youtubeId" TEXT,
    "imageUrls" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RootsEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RootsEntry_section_key" ON "RootsEntry"("section");

-- Seed build section (001)
INSERT INTO "RootsEntry" ("id", "section", "order", "title", "description", "videoTitle", "youtubeId", "imageUrls", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'build', 0, 'Built with our hands, ground to roof.', 'We don''t design solutions on paper — we execute them. This is the permanent archive of our community school''s full construction timeline — from first stone to final beam.', 'School build, A to Z', NULL, '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed transformation section (002)
INSERT INTO "RootsEntry" ("id", "section", "order", "title", "description", "videoTitle", "youtubeId", "imageUrls", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'transformation', 1, 'From construction to classroom', 'We laid the foundation not just in soil, but in hope. Today, children sit where we dreamed. They fill it with life.', '', NULL, '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed computer lab section (003)
INSERT INTO "RootsEntry" ("id", "section", "order", "title", "description", "videoTitle", "youtubeId", "imageUrls", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'computer-lab', 2, 'Building the computer lab, component by component.', 'No lab exists yet — we''re building one from scratch. Local machines, hand-built benches, wired by our own hands.', 'Computer lab build, from scratch', NULL, '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed children in lab section (004)
INSERT INTO "RootsEntry" ("id", "section", "order", "title", "description", "videoTitle", "youtubeId", "imageUrls", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), 'children-lab', 3, 'The children now inside the laboratory learning.', 'Where there was nothing, now there are fingers on keyboards and eyes on screens.', '', NULL, '[]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
