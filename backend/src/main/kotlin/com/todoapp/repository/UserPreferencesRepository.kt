package com.todoapp.repository

import com.todoapp.model.UserPreferences

interface UserPreferencesRepository {
    fun getPreferences(): UserPreferences
    fun updatePreferences(darkMode: Boolean): UserPreferences
}
