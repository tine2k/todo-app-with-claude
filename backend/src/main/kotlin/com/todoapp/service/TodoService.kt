package com.todoapp.service

import com.todoapp.model.Todo
import com.todoapp.repository.TodoRepository
import org.springframework.stereotype.Service

@Service
class TodoService(private val todoRepository: TodoRepository) {

    companion object {
        private const val MAX_TODOS = 100
    }

    fun getAllTodos(): List<Todo> {
        return todoRepository.findAll()
    }

    fun addTodo(text: String): Result<Todo> {
        if (todoRepository.findAll().size >= MAX_TODOS) {
            return Result.failure(IllegalStateException("Maximum of $MAX_TODOS todos allowed"))
        }

        val newTodo = todoRepository.save(text, completed = false)
        return Result.success(newTodo)
    }

    fun updateTodo(id: Long, text: String?, completed: Boolean?): Todo? {
        return todoRepository.update(id, text, completed)
    }

    fun deleteTodo(id: Long): Boolean {
        return todoRepository.deleteById(id)
    }

    fun deleteAllTodos() {
        todoRepository.deleteAll()
    }

    fun reorderTodos(orderedIds: List<Long>): Boolean {
        val allTodos = todoRepository.findAll()

        // Verify all IDs exist and the count matches
        if (orderedIds.size != allTodos.size || !orderedIds.all { id -> allTodos.any { it.id == id } }) {
            return false
        }

        // Create a map of ID to new position (position is the index in the orderedIds list)
        val idToPositionMap = orderedIds.mapIndexed { index, id -> id to index }.toMap()

        // Update positions in the database
        return todoRepository.updatePositions(idToPositionMap)
    }
}
