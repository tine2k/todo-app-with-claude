package com.todoapp.repository

import com.todoapp.model.Todo

interface TodoRepository {
    fun findAll(): List<Todo>
    fun findById(id: Long): Todo?
    fun save(text: String, completed: Boolean = false): Todo
    fun update(id: Long, text: String?, completed: Boolean?): Todo?
    fun deleteById(id: Long): Boolean
    fun deleteAll(): Int
    fun updatePositions(idToPositionMap: Map<Long, Int>): Boolean
}
