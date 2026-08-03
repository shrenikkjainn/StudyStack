document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, redirect to dashboard
    if (getToken()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleLink = document.getElementById('toggle-link');
    const authSubtitle = document.getElementById('auth-subtitle');
    const toggleContainerSpan = document.querySelector('#toggle-container span');
    const loginBtn = document.getElementById('login-btn');
    const regBtn = document.getElementById('reg-btn');

    let isLoginView = true;

    // Toggle between Login and Register views
    toggleLink.addEventListener('click', () => {
        isLoginView = !isLoginView;
        
        if (isLoginView) {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            authSubtitle.textContent = 'Welcome back! Please login.';
            toggleContainerSpan.textContent = "Don't have an account?";
            toggleLink.textContent = "Sign up";
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            authSubtitle.textContent = 'Create your account to get started.';
            toggleContainerSpan.textContent = "Already have an account?";
            toggleLink.textContent = "Log in";
        }
    });

    // Handle Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const originalText = loginBtn.textContent;
        
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;

        try {
            const data = await apiCall('/login', 'POST', { email, password });
            
            // Save auth data
            localStorage.setItem('studyStack_token', data.token);
            localStorage.setItem('studyStack_user', JSON.stringify(data.user));
            
            showNotification('Login successful!', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            
        } catch (error) {
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
        }
    });

    // Handle Registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const role = document.getElementById('reg-role').value;
        const originalText = regBtn.textContent;
        
        regBtn.textContent = 'Creating account...';
        regBtn.disabled = true;

        try {
            const data = await apiCall('/register', 'POST', { name, email, password, role });
            
            // Save auth data
            localStorage.setItem('studyStack_token', data.token);
            localStorage.setItem('studyStack_user', JSON.stringify(data.user));
            
            showNotification('Account created successfully!', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            
        } catch (error) {
            regBtn.textContent = originalText;
            regBtn.disabled = false;
        }
    });
});
