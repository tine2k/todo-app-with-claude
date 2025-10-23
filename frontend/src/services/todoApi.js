const API_BASE_URL = 'http://localhost:8080/api/todos';

/**
 * Fetch all todos from the backend
 */
export async function fetchTodos() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
}

/**
 * Create a new todo
 * @param {string} text - The todo text
 * @returns {Promise<Object>} The created todo
 */
export async function createTodo(text) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to create todo' }));
    throw new Error(error.error || 'Failed to create todo');
  }

  return response.json();
}

/**
 * Update an existing todo
 * @param {number} id - The todo ID
 * @param {Object} updates - Updates to apply { text?, completed? }
 * @returns {Promise<Object>} The updated todo
 */
export async function updateTodo(id, updates) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return response.json();
}

/**
 * Delete a todo by ID
 * @param {number} id - The todo ID
 */
export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
}

/**
 * Delete all todos
 */
export async function deleteAllTodos() {
  const response = await fetch(API_BASE_URL, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete all todos');
  }
}

/**
 * Reorder todos based on drag and drop
 * @param {Array<number>} orderedIds - Array of todo IDs in the new order
 */
export async function reorderTodos(orderedIds) {
  const response = await fetch(`${API_BASE_URL}/reorder`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderedIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to reorder todos');
  }
}
