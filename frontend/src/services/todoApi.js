const API_BASE_URL = 'http://localhost:8080/api/todos';
const PREFERENCES_API_URL = 'http://localhost:8080/api/preferences';

// Offline queue for pending requests
const OFFLINE_QUEUE_KEY = 'todoOfflineQueue';

/**
 * Get pending offline requests from localStorage
 */
function getOfflineQueue() {
  try {
    const queue = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch (error) {
    console.error('Failed to load offline queue:', error);
    return [];
  }
}

/**
 * Save pending offline requests to localStorage
 */
function saveOfflineQueue(queue) {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to save offline queue:', error);
  }
}

/**
 * Add a request to the offline queue
 */
function addToOfflineQueue(request) {
  const queue = getOfflineQueue();
  queue.push({
    ...request,
    timestamp: Date.now(),
  });
  saveOfflineQueue(queue);
}

/**
 * Process the offline queue when connection is restored
 */
export async function processOfflineQueue() {
  const queue = getOfflineQueue();
  if (queue.length === 0) {
    return;
  }

  console.log(`[Offline Queue] Processing ${queue.length} pending requests`);

  const failedRequests = [];

  for (const request of queue) {
    try {
      const { method, url, body } = request;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        console.error(`[Offline Queue] Failed to sync request to ${url}`);
        failedRequests.push(request);
      } else {
        console.log(`[Offline Queue] Successfully synced request to ${url}`);
      }
    } catch (error) {
      console.error(`[Offline Queue] Error syncing request:`, error);
      failedRequests.push(request);
    }
  }

  // Save only the failed requests back to the queue
  saveOfflineQueue(failedRequests);

  if (failedRequests.length > 0) {
    console.warn(`[Offline Queue] ${failedRequests.length} requests failed to sync`);
  } else {
    console.log('[Offline Queue] All requests synced successfully');
  }

  return {
    total: queue.length,
    synced: queue.length - failedRequests.length,
    failed: failedRequests.length,
  };
}

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
  try {
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
  } catch (error) {
    // If offline, queue the request
    if (!navigator.onLine) {
      addToOfflineQueue({
        method: 'POST',
        url: API_BASE_URL,
        body: { text },
      });
      console.log('[Offline Queue] Queued create todo request');
    }
    throw error;
  }
}

/**
 * Update an existing todo
 * @param {number} id - The todo ID
 * @param {Object} updates - Updates to apply { text?, completed? }
 * @returns {Promise<Object>} The updated todo
 */
export async function updateTodo(id, updates) {
  try {
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
  } catch (error) {
    // If offline, queue the request
    if (!navigator.onLine) {
      addToOfflineQueue({
        method: 'PUT',
        url: `${API_BASE_URL}/${id}`,
        body: updates,
      });
      console.log('[Offline Queue] Queued update todo request');
    }
    throw error;
  }
}

/**
 * Delete a todo by ID
 * @param {number} id - The todo ID
 */
export async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    // If offline, queue the request
    if (!navigator.onLine) {
      addToOfflineQueue({
        method: 'DELETE',
        url: `${API_BASE_URL}/${id}`,
      });
      console.log('[Offline Queue] Queued delete todo request');
    }
    throw error;
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

/**
 * Fetch user preferences from the backend
 * @returns {Promise<Object>} The user preferences { id, darkMode }
 */
export async function fetchPreferences() {
  const response = await fetch(PREFERENCES_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch preferences');
  }
  return response.json();
}

/**
 * Update user preferences
 * @param {boolean} darkMode - Dark mode preference
 * @returns {Promise<Object>} The updated preferences
 */
export async function updatePreferences(darkMode) {
  try {
    const response = await fetch(PREFERENCES_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ darkMode }),
    });

    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }

    return response.json();
  } catch (error) {
    // If offline, queue the request
    if (!navigator.onLine) {
      addToOfflineQueue({
        method: 'PUT',
        url: PREFERENCES_API_URL,
        body: { darkMode },
      });
      console.log('[Offline Queue] Queued update preferences request');
    }
    throw error;
  }
}
