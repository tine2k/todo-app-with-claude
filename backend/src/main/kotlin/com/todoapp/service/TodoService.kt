package com.todoapp.service

import com.todoapp.model.Todo
import org.springframework.stereotype.Service

@Service
class TodoService {

    companion object {
        private const val MAX_TODOS = 4
    }

    private val todos = mutableListOf<Todo>(
        Todo(1, "Learn Kotlin", false),
        Todo(2, "Build Spring Boot API", true),
        Todo(3, "Connect React Frontend", false)
    )

    private var nextId = 4L

    @Synchronized
    fun getAllTodos(): List<Todo> {
        return todos.toList()
    }

    @Synchronized
    fun addTodo(text: String): Result<Todo> {
        if (todos.size >= MAX_TODOS) {
            return Result.failure(IllegalStateException("Maximum of $MAX_TODOS todos allowed"))
        }

        val newTodo = Todo(nextId++, text, false)
        todos.add(newTodo)
        return Result.success(newTodo)
    }

    @Synchronized
    fun updateTodo(id: Long, text: String?, completed: Boolean?): Todo? {
        val index = todos.indexOfFirst { it.id == id }
        if (index == -1) return null

        val todo = todos[index]
        val updatedTodo = todo.copy(
            text = text ?: todo.text,
            completed = completed ?: todo.completed
        )
        todos[index] = updatedTodo
        return updatedTodo
    }

    @Synchronized
    fun deleteTodo(id: Long): Boolean {
        return todos.removeIf { it.id == id }
    }

    @Synchronized
    fun deleteAllTodos() {
        todos.clear()
    }

    @Synchronized
    fun reorderTodos(orderedIds: List<Long>): Boolean {
        // Verify all IDs exist
        if (orderedIds.size != todos.size || !orderedIds.all { id -> todos.any { it.id == id } }) {
            return false
        }

        // Create a map for quick lookup
        val todoMap = todos.associateBy { it.id }

        // Reorder based on the provided IDs
        todos.clear()
        orderedIds.forEach { id ->
            todoMap[id]?.let { todos.add(it) }
        }

        return true
    }
}
