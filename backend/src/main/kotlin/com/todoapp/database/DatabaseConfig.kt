package com.todoapp.database

import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class TodoSchemaInitializer : ApplicationRunner {

    override fun run(args: ApplicationArguments?) {
        // Create tables and add missing columns if they don't exist
        // Database connection is already set up by ExposedAutoConfiguration
        transaction {
            SchemaUtils.createMissingTablesAndColumns(TodoTable, UserPreferencesTable)

            // Handle existing data: assign positions to any todos that have position = 0
            val todosWithoutPosition = TodoTable.selectAll()
                .where { TodoTable.position eq 0 }
                .orderBy(TodoTable.id to SortOrder.ASC)
                .toList()

            if (todosWithoutPosition.isNotEmpty()) {
                todosWithoutPosition.forEachIndexed { index, row ->
                    TodoTable.update({ TodoTable.id eq row[TodoTable.id] }) {
                        it[TodoTable.position] = index
                    }
                }
            }
        }
    }
}
