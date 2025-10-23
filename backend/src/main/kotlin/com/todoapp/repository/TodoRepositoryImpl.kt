package com.todoapp.repository

import com.todoapp.database.TodoTable
import com.todoapp.model.Todo
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository

@Repository
class TodoRepositoryImpl : TodoRepository {

    override fun findAll(): List<Todo> = transaction {
        TodoTable.selectAll()
            .orderBy(TodoTable.position to SortOrder.ASC)
            .map { it.toTodo() }
    }

    override fun findById(id: Long): Todo? = transaction {
        TodoTable.selectAll().where { TodoTable.id eq id }
            .map { it.toTodo() }
            .singleOrNull()
    }

    override fun save(text: String, completed: Boolean): Todo = transaction {
        // Find the max position and add 1, or use 0 if no todos exist
        val maxPosition = TodoTable.selectAll()
            .maxOfOrNull { it[TodoTable.position] } ?: -1
        val newPosition = maxPosition + 1

        val id = TodoTable.insert {
            it[TodoTable.text] = text
            it[TodoTable.completed] = completed
            it[TodoTable.position] = newPosition
        } get TodoTable.id

        Todo(id = id, text = text, completed = completed, position = newPosition)
    }

    override fun update(id: Long, text: String?, completed: Boolean?): Todo? = transaction {
        val existing = findById(id) ?: return@transaction null

        TodoTable.update({ TodoTable.id eq id }) {
            if (text != null) it[TodoTable.text] = text
            if (completed != null) it[TodoTable.completed] = completed
        }

        findById(id)
    }

    override fun deleteById(id: Long): Boolean = transaction {
        TodoTable.deleteWhere { TodoTable.id eq id } > 0
    }

    override fun deleteAll(): Int = transaction {
        TodoTable.deleteAll()
    }

    override fun updatePositions(idToPositionMap: Map<Long, Int>): Boolean = transaction {
        try {
            idToPositionMap.forEach { (id, position) ->
                TodoTable.update({ TodoTable.id eq id }) {
                    it[TodoTable.position] = position
                }
            }
            true
        } catch (e: Exception) {
            false
        }
    }

    private fun ResultRow.toTodo() = Todo(
        id = this[TodoTable.id],
        text = this[TodoTable.text],
        completed = this[TodoTable.completed],
        position = this[TodoTable.position]
    )
}
