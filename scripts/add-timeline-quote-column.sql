-- Add optional quote text for BUSA timeline (matches GraphQL field `quote`).
-- 1) Set @@map in your Prisma model to know the real table name, then run ONE of the blocks below.
-- 2) After SQL: add `quote String? @db.Text` to the model and `quote` to CreateTimelineInput / UpdateTimelineInput + resolvers on your API.

-- PostgreSQL (default Prisma model name → quoted "TimelineEntry")
ALTER TABLE "TimelineEntry" ADD COLUMN IF NOT EXISTS "quote" TEXT;

-- If your table is snake_case mapped, e.g. @@map("timeline_entries"):
-- ALTER TABLE "timeline_entries" ADD COLUMN IF NOT EXISTS "quote" TEXT;

-- MySQL / MariaDB (unquoted identifiers; change table name if needed):
-- ALTER TABLE TimelineEntry ADD COLUMN quote TEXT NULL;
