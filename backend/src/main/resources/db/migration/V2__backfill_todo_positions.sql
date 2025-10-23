-- Backfill positions for existing todos that have position = 0
-- This mirrors the logic from TodoSchemaInitializer
WITH numbered_todos AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY id ASC) - 1 AS new_position
    FROM todos
    WHERE position = 0
)
UPDATE todos
SET position = numbered_todos.new_position
FROM numbered_todos
WHERE todos.id = numbered_todos.id;
