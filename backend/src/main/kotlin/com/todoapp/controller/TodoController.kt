package com.todoapp.controller

import com.todoapp.dto.CreateTodoRequest
import com.todoapp.dto.ReorderRequest
import com.todoapp.dto.UpdateTodoRequest
import com.todoapp.model.Todo
import com.todoapp.service.TodoService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/todos")
class TodoController(private val todoService: TodoService) {

    @GetMapping
    fun getTodos(): List<Todo> {
        return todoService.getAllTodos()
    }

    @PostMapping
    fun createTodo(@RequestBody request: CreateTodoRequest): ResponseEntity<Any> {
        val result = todoService.addTodo(request.text)
        return result.fold(
            onSuccess = { todo -> ResponseEntity.status(HttpStatus.CREATED).body(todo) },
            onFailure = { error -> ResponseEntity.badRequest().body(mapOf("error" to error.message)) }
        )
    }

    @PutMapping("/{id}")
    fun updateTodo(
        @PathVariable id: Long,
        @RequestBody request: UpdateTodoRequest
    ): ResponseEntity<Todo> {
        val updatedTodo = todoService.updateTodo(id, request.text, request.completed)
        return if (updatedTodo != null) {
            ResponseEntity.ok(updatedTodo)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteTodo(@PathVariable id: Long): ResponseEntity<Void> {
        return if (todoService.deleteTodo(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping
    fun deleteAllTodos(): ResponseEntity<Void> {
        todoService.deleteAllTodos()
        return ResponseEntity.noContent().build()
    }

    @PutMapping("/reorder")
    fun reorderTodos(@RequestBody request: ReorderRequest): ResponseEntity<Void> {
        return if (todoService.reorderTodos(request.orderedIds)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.badRequest().build()
        }
    }
}
