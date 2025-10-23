---
id: task-11
title: >-
  On the backend, implement a persistence layer with Koltin Exposed. Save the
  data to a postres database. Create a docker-compose file that Spring Boott
  starts automatically.
status: Done
assignee: []
created_date: '2025-10-23 19:04'
updated_date: '2025-10-23 19:26'
labels: []
dependencies: []
ordinal: 1000
---

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 PostgreSQL database runs in Docker container via docker-compose
- [x] #2 Kotlin Exposed framework is integrated with Spring Boot backend
- [x] #3 TodoTable schema is created automatically on application startup
- [x] #4 Repository layer implements all CRUD operations (Create, Read, Update, Delete)
- [x] #5 TodoController uses repository instead of hardcoded data
- [x] #6 Data persists in PostgreSQL database across application restarts
- [x] #7 All existing API endpoints continue to work with database backend
- [x] #8 docker-compose.yml includes PostgreSQL service with proper configuration
- [x] #9 Application connects to database successfully on startup
- [x] #10 Documentation is updated with database setup instructions
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Add Kotlin Exposed Dependencies
- Add Exposed framework dependencies to `backend/pom.xml`:
  - `exposed-core` - Core Exposed functionality
  - `exposed-dao` - DAO pattern support
  - `exposed-jdbc` - JDBC integration
  - `exposed-spring-boot-starter` - Spring Boot integration
- Add PostgreSQL JDBC driver dependency
- Add HikariCP connection pool (if not included by Spring Boot)

### 2. Create Docker Compose Configuration
- Create `docker-compose.yml` in backend directory with:
  - PostgreSQL service (port 5432)
  - Database name, username, password configuration
  - Volume for data persistence
  - Health check for database readiness
- Update `.gitignore` to exclude docker volumes if needed

### 3. Update Application Configuration
- Modify `backend/src/main/resources/application.properties`:
  - Add database connection URL (jdbc:postgresql://localhost:5432/tododb)
  - Add database credentials
  - Configure Exposed logging level
  - Add connection pool settings

### 4. Create Database Schema with Exposed
- Create `backend/src/main/kotlin/com/todoapp/database/TodoTable.kt`:
  - Define Todos table schema using Exposed DSL
  - Columns: id (auto-increment), text (varchar), completed (boolean), createdAt (timestamp)
- Create `backend/src/main/kotlin/com/todoapp/database/DatabaseConfig.kt`:
  - Configuration class for database initialization
  - Schema creation logic
  - Transaction management setup

### 5. Create Repository Layer
- Create `backend/src/main/kotlin/com/todoapp/repository/TodoRepository.kt`:
  - Interface defining CRUD operations
  - Methods: findAll(), findById(), save(), update(), deleteById(), deleteAll()
- Create `backend/src/main/kotlin/com/todoapp/repository/TodoRepositoryImpl.kt`:
  - Implementation using Exposed's transaction DSL
  - Map between database rows and Todo model

### 6. Update Controller to Use Repository
- Modify `backend/src/main/kotlin/com/todoapp/controller/TodoController.kt`:
  - Inject TodoRepository
  - Replace hardcoded todo list with database calls
  - Add POST endpoint for creating todos
  - Add PUT endpoint for updating todos
  - Add DELETE endpoint for deleting todos
  - Proper error handling and HTTP status codes

### 7. Testing and Verification
- Start PostgreSQL with `docker-compose up -d`
- Run Spring Boot application with `mvn spring-boot:run`
- Verify database connection and schema creation
- Test all endpoints using curl or frontend
- Verify data persistence across application restarts

### 8. Documentation Updates
- Update `CLAUDE.md` with:
  - Docker Compose commands
  - Database schema information
  - Repository layer architecture
  - New API endpoint documentation
- Update `README.md` with setup instructions for running with Docker
<!-- SECTION:PLAN:END -->
