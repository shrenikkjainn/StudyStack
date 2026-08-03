// Centralized API Configuration and Helpers

// The base URL of the deployed backend.
// Change this if you deploy to a different URL or want to test locally (e.g., http://localhost:5000/api)
const API_BASE_URL = 'https://studystack-backend-lsqw.onrender.com';

// Helper to get auth token
const getToken = () => localStorage.getItem('studyStack_token');

// Helper to get logged in user data
const getUser = () => {
    const userStr = localStorage.getItem('studyStack_user');
    return userStr ? JSON.parse(userStr) : null;
};

// Global notification system
const showNotification = (message, type = 'success') => {
    let notifEl = document.getElementById('notification');
    if (!notifEl) {
        notifEl = document.createElement('div');
        notifEl.id = 'notification';
        document.body.appendChild(notifEl);
    }
    
    notifEl.textContent = message;
    notifEl.className = `show notify-${type}`;
    
    setTimeout(() => {
        notifEl.classList.remove('show');
    }, 3000);
};

// Generic API fetch wrapper
async function apiCall(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data;
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
}
