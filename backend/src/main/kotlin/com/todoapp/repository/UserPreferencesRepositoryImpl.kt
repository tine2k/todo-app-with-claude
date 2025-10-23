package com.todoapp.repository

import com.todoapp.database.UserPreferencesTable
import com.todoapp.model.UserPreferences
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository
import java.time.Instant

@Repository
class UserPreferencesRepositoryImpl : UserPreferencesRepository {

    private val PREFERENCES_ID = 1L

    override fun getPreferences(): UserPreferences = transaction {
        UserPreferencesTable.selectAll()
            .where { UserPreferencesTable.id eq PREFERENCES_ID }
            .singleOrNull()
            ?.let { row ->
                UserPreferences(
                    id = row[UserPreferencesTable.id],
                    darkMode = row[UserPreferencesTable.darkMode]
                )
            } ?: createDefaultPreferences()
    }

    override fun updatePreferences(darkMode: Boolean): UserPreferences = transaction {
        val exists = UserPreferencesTable.selectAll()
            .where { UserPreferencesTable.id eq PREFERENCES_ID }
            .count() > 0

        if (exists) {
            UserPreferencesTable.update({ UserPreferencesTable.id eq PREFERENCES_ID }) {
                it[UserPreferencesTable.darkMode] = darkMode
                it[updatedAt] = Instant.now()
            }
        } else {
            UserPreferencesTable.insert {
                it[id] = PREFERENCES_ID
                it[UserPreferencesTable.darkMode] = darkMode
                it[updatedAt] = Instant.now()
            }
        }

        UserPreferences(id = PREFERENCES_ID, darkMode = darkMode)
    }

    private fun createDefaultPreferences(): UserPreferences {
        UserPreferencesTable.insert {
            it[id] = PREFERENCES_ID
            it[darkMode] = false
            it[updatedAt] = Instant.now()
        }
        return UserPreferences(id = PREFERENCES_ID, darkMode = false)
    }
}
