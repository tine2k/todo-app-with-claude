package com.todoapp.dto

data class UpdateTodoRequest(
    val text: String? = null,
    val completed: Boolean? = null
)
