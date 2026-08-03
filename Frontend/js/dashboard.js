document.addEventListener('DOMContentLoaded', () => {
    // Authentication Check
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
        window.location.href = 'index.html';
        return;
    }

    // Set UI User Info
    document.getElementById('user-display-name').textContent = `Hello, ${user.name} (${user.role})`;

    // Handle Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('studyStack_token');
        localStorage.removeItem('studyStack_user');
        window.location.href = 'index.html';
    });

    // DOM Elements
    const coursesGrid = document.getElementById('courses-grid');
    const showCreateModalBtn = document.getElementById('show-create-modal-btn');
    const createModal = document.getElementById('create-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const createCourseForm = document.getElementById('create-course-form');
    const createCourseBtn = document.getElementById('create-course-btn');

    // Show "Create Course" button only if instructor
    if (user.role === 'instructor') {
        showCreateModalBtn.classList.remove('hidden');
    }

    // Modal Logic
    showCreateModalBtn.addEventListener('click', () => {
        createModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        createModal.classList.remove('active');
    });

    // Close modal on outside click
    createModal.addEventListener('click', (e) => {
        if (e.target === createModal) {
            createModal.classList.remove('active');
        }
    });

    // Fetch and Render Courses
    const loadCourses = async () => {
        try {
            const courses = await apiCall('/api/courses', 'GET');
            
            if (courses.length === 0) {
                coursesGrid.innerHTML = `<p style="color: var(--text-muted);">No courses available yet.</p>`;
                return;
            }

            coursesGrid.innerHTML = ''; // Clear loading text
            
            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card glass-panel';
                
                // Only instructors can see delete buttons (for simplicity, we let any instructor try, but backend validates it)
                const deleteBtnHtml = user.role === 'instructor' 
                    ? `<button class="btn-small btn-danger" onclick="deleteCourse('${course._id}')">Delete</button>` 
                    : '';

                card.innerHTML = `
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-meta">
                        <span>By: ${course.instructor}</span>
                        <span class="course-price">$${course.price}</span>
                    </div>
                    <div class="course-actions">
                        ${deleteBtnHtml}
                    </div>
                `;
                coursesGrid.appendChild(card);
            });

        } catch (error) {
            coursesGrid.innerHTML = `<p style="color: var(--error);">Failed to load courses. Please try again.</p>`;
        }
    };

    // Handle Course Creation
    createCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('course-title').value;
        const price = document.getElementById('course-price').value;
        
        const originalText = createCourseBtn.textContent;
        createCourseBtn.textContent = 'Creating...';
        createCourseBtn.disabled = true;

        try {
            await apiCall('/api/courses', 'POST', { 
                title, 
                price: Number(price),
                instructor: user.name // Depending on backend logic, instructor name might be required
            });
            
            showNotification('Course created successfully!', 'success');
            createModal.classList.remove('active');
            createCourseForm.reset();
            
            // Reload courses to show the new one
            await loadCourses();
            
        } catch (error) {
            // Error is handled by apiCall
        } finally {
            createCourseBtn.textContent = originalText;
            createCourseBtn.disabled = false;
        }
    });

    // Make deleteCourse available globally so inline onclick handlers can use it
    window.deleteCourse = async (courseId) => {
        if (!confirm('Are you sure you want to delete this course?')) return;
        
        try {
            await apiCall(`/api/courses/${courseId}`, 'DELETE');
            showNotification('Course deleted!', 'success');
            await loadCourses(); // Reload
        } catch (error) {
            // Error is handled by apiCall
        }
    };

    // Initial Load
    loadCourses();
});
