package com.todoapp.controller

import com.todoapp.dto.UpdatePreferencesRequest
import com.todoapp.model.UserPreferences
import com.todoapp.service.UserPreferencesService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/preferences")
class UserPreferencesController(
    private val userPreferencesService: UserPreferencesService
) {

    @GetMapping
    fun getPreferences(): ResponseEntity<UserPreferences> {
        val preferences = userPreferencesService.getPreferences()
        return ResponseEntity.ok(preferences)
    }

    @PutMapping
    fun updatePreferences(@RequestBody request: UpdatePreferencesRequest): ResponseEntity<UserPreferences> {
        val preferences = userPreferencesService.updatePreferences(request.darkMode)
        return ResponseEntity.ok(preferences)
    }
}
