package com.todoapp.service

import com.todoapp.model.UserPreferences
import com.todoapp.repository.UserPreferencesRepository
import org.springframework.stereotype.Service

@Service
class UserPreferencesService(
    private val userPreferencesRepository: UserPreferencesRepository
) {
    fun getPreferences(): UserPreferences {
        return userPreferencesRepository.getPreferences()
    }

    fun updatePreferences(darkMode: Boolean): UserPreferences {
        return userPreferencesRepository.updatePreferences(darkMode)
    }
}
