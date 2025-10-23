package com.todoapp.database

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.timestamp
import java.time.Instant

object UserPreferencesTable : Table("user_preferences") {
    val id = long("id").autoIncrement()
    val darkMode = bool("dark_mode").default(false)
    val updatedAt = timestamp("updated_at").default(Instant.now())

    override val primaryKey = PrimaryKey(id)
}
