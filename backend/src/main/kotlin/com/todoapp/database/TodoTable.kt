package com.todoapp.database

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.timestamp
import java.time.Instant

object TodoTable : Table("todos") {
    val id = long("id").autoIncrement()
    val text = varchar("text", 500)
    val completed = bool("completed").default(false)
    val position = integer("position").default(0)
    val createdAt = timestamp("created_at").default(Instant.now())

    override val primaryKey = PrimaryKey(id)
}
