---
id: task-6
title: Add a spring boot backend without any functionality yet
status: Done
assignee:
  - Claude
created_date: '2025-10-14 20:36'
updated_date: '2025-10-16 19:42'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a Spring Boot backend using Kotlin and restructure the project to separate frontend and backend into their own folders. This creates a cleaner monorepo structure with no backend functionality yet - just the skeleton structure ready for future API development.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Frontend code moved to frontend/ directory
- [x] #2 All frontend paths and configurations updated and working
- [x] #3 Frontend runs successfully from frontend/ directory
- [x] #4 Empty tests/ directory removed
- [x] #5 Backend directory created with proper Spring Boot Kotlin structure
- [x] #6 Maven pom.xml configured with Spring Boot and Kotlin 2.x dependencies/plugins
- [x] #7 Main application class created in Kotlin (TodoBackendApplication.kt)
- [x] #8 Health endpoint at GET /health returns JSON response
- [x] #9 Backend runs on port 8080 without errors
- [x] #10 Basic application.properties configured
- [x] #11 .gitignore files properly configured for both frontend and backend
- [x] #12 README.md updated with new structure and Kotlin tech stack info
- [x] #13 CLAUDE.md updated with new structure
- [x] #14 No backend functionality implemented beyond health check (skeleton only)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Project Structure
```
todo-app/
├── frontend/                     # Moved React application
│   ├── src/, public/, dist/, node_modules/
│   ├── package.json, package-lock.json
│   ├── vite.config.mjs, vitest.config.js
│   ├── tailwind.config.js, postcss.config.cjs
├── backend/                      # New Spring Boot Kotlin application
│   ├── src/main/kotlin/com/todoapp/
│   │   ├── TodoBackendApplication.kt
│   │   └── controller/HealthController.kt
│   ├── src/main/resources/application.properties
│   ├── pom.xml
│   └── .gitignore
├── CLAUDE.md, README.md          # Update with new structure
└── .gitignore                    # Root gitignore
```

### Implementation Steps

1. **Create Frontend Directory and Move Files**
   - Create `frontend/` directory
   - Move: src/, public/, dist/, node_modules/, package.json, package-lock.json, vite.config.mjs, vitest.config.js, tailwind.config.js, postcss.config.cjs
   - Delete empty `tests/` directory

2. **Update Frontend Configuration**
   - Verify paths in vite.config.mjs and vitest.config.js
   - Test npm run dev, build, and test from frontend/ directory

3. **Create Backend Directory Structure**
   - Create backend/ with Maven/Spring Boot structure
   - Use kotlin/ directory instead of java/

4. **Initialize Spring Boot Kotlin Application**
   - Create pom.xml with:
     - Spring Boot 3.x
     - Kotlin 2.x
     - Spring Boot Starter Web
     - kotlin-maven-plugin
     - kotlin-stdlib-jdk8 and kotlin-reflect
     - Java 17 or 21 target
   - Create TodoBackendApplication.kt with @SpringBootApplication
   - Create application.properties (port 8080, app name)

5. **Add Health Check Endpoint**
   - Create HealthController.kt with GET /health endpoint
   - Return simple JSON response

6. **Update .gitignore Files**
   - Root .gitignore: frontend/ and backend/ specific ignores
   - Backend .gitignore: target/, *.class, etc.

7. **Update Documentation**
   - README.md: new structure, tech stack (Spring Boot + Kotlin 2 + Maven), run instructions, ports
   - CLAUDE.md: new structure

### Technology Choices
- Language: Kotlin 2.x
- Build Tool: Maven
- Spring Boot: 3.x
- Java Target: 17 or 21
- Ports: Frontend 3000, Backend 8080
- Packaging: JAR
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Successfully completed task-6 with all acceptance criteria met.

Frontend: Moved to frontend/ directory, all configs working, builds successfully.

Backend: Spring Boot 3.3.5 + Kotlin 2.0.21 + Java 21, runs on port 8080.

Health endpoint working: GET /health returns {"status":"UP","service":"todo-backend"}.

Documentation: README.md and CLAUDE.md updated with full-stack architecture.

Project structure: Clean monorepo with frontend/ and backend/ directories.

Empty tests/ directory removed. .gitignore files configured for both stacks.

No backend business logic implemented - skeleton only as requested.
<!-- SECTION:NOTES:END -->
