---
id: task-16
title: replace TodoSchemaInitializer with sql and flyway integration
status: Done
assignee:
  - Claude
created_date: '2025-10-23 20:03'
updated_date: '2025-10-23 21:31'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the current TodoSchemaInitializer component that uses Exposed's SchemaUtils.createMissingTablesAndColumns() with proper SQL-based database migrations using Flyway. This will provide version-controlled, repeatable database schema management that follows industry best practices.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Flyway dependency added to pom.xml
- [x] #2 Initial migration SQL file created for todos table schema
- [x] #3 Migration handles existing data (position backfill logic)
- [x] #4 TodoSchemaInitializer component removed from codebase
- [x] #5 Application starts successfully with Flyway migrations
- [x] #6 Existing todos data is preserved after migration
- [x] #7 flyway_schema_history table tracks migration versions
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Steps
1. Add Flyway dependencies to pom.xml (flyway-core and flyway-database-postgresql)
2. Create db/migration directory structure in resources
3. Create V1__create_todos_table.sql with full table schema
4. Create V2__backfill_todo_positions.sql for existing data migration
5. Configure Flyway in application.properties (baseline-on-migrate, locations)
6. Delete DatabaseConfig.kt (TodoSchemaInitializer component)
7. Test application startup with fresh and existing databases

### Key Technical Decisions
- Use Flyway baseline-on-migrate=true to handle existing databases gracefully
- Split schema creation (V1) and data migration (V2) for clarity
- Mirror existing position backfill logic in SQL migration
- Keep Exposed for runtime queries, use Flyway only for schema management
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Implementation Results

### Successful Verification
1. **Application Startup**: Spring Boot started successfully in 0.791 seconds
2. **Flyway Migrations Applied**:
   - Baseline (v0) - Initial baseline for existing database
   - V1 - Create todos table schema
   - V2 - Backfill todo positions
3. **Data Preservation**: All 6 existing todos preserved with correct data
4. **flyway_schema_history table**: Created and tracking 3 migrations

### Migration Details
- flyway_schema_history shows all migrations successful (success = t)
- baseline-on-migrate handled existing database gracefully
- Position backfill logic executed correctly via SQL
- No data loss during migration

### Files Modified
- Added: flyway-core and flyway-database-postgresql dependencies to pom.xml
- Created: V1__create_todos_table.sql and V2__backfill_todo_positions.sql
- Updated: application.properties with Flyway configuration
- Deleted: DatabaseConfig.kt (TodoSchemaInitializer component)
<!-- SECTION:NOTES:END -->
