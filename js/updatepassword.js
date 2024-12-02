// Add event listeners for form inputs
document.addEventListener('DOMContentLoaded', function() {
    const checkEmailBtn = document.getElementById('check-email-btn');
    const updatePasswordBtn = document.getElementById('update-password-btn');
    const knowPasswordCheckbox = document.getElementById('know-password');
    const backBtn = document.getElementById('back-btn');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Email Check Event Listener
    checkEmailBtn.addEventListener('click', function () {
        const email = document.getElementById('email').value.trim();
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!email) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (userData && userData.email === email) {
            showProfileInfo(userData);
            showPasswordUpdateSection();
        } else {
            showToast('No account found with that email. Please create an account.', 'error');
        }
    });

    // Password Update Event Listener
    updatePasswordBtn.addEventListener('click', async function () {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const oldPassword = document.getElementById('old-password').value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const favoriteBookSlug = convertToSlug(document.getElementById('favorite-book').value.trim());

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match.', 'error');
            return;
        }

        // Validate password complexity
        if (!validatePassword(newPassword)) {
            return;
        }

        try {
            // Check password update method
            if (document.getElementById('know-password').checked) {
                // Verify old password
                if (oldPassword === userData.password) {
                    await updatePassword(userData, newPassword);
                } else {
                    showToast('Incorrect old password. Please try again.', 'error');
                }
            } else {
                // Verify favorite book
                if (favoriteBookSlug === userData.favoriteBook) {
                    await updatePassword(userData, newPassword);
                } else {
                    showToast('Incorrect favorite book. Please try again.', 'error');
                }
            }
        } catch (error) {
            showToast('An error occurred while updating the password.', 'error');
            console.error(error);
        }
    });

    // Real-time validation for password fields
    newPasswordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    // Back button resets the page
    backBtn.addEventListener('click', resetPage);

    // Toggle between "I know my password" and "I don't know my password"
    knowPasswordCheckbox.addEventListener('change', function () {
        const isChecked = this.checked;
        toggleVisibility('old-password', isChecked);
        toggleVisibility('favorite-book', !isChecked);
    });
});

// Validate passwords and manage button state
function validatePasswords() {
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const passwordMatchLabel = document.getElementById("password-match-label");

    if (!newPassword || !confirmPassword) {
        disableUpdateButton(true);
        return;
    }

    if (newPassword !== confirmPassword) {
        passwordMatchLabel.style.display = "block";
        disableUpdateButton(true);
        return;
    }

    if (validatePassword(newPassword)) {
        passwordMatchLabel.style.display = "none";
        disableUpdateButton(false);
    } else {
        disableUpdateButton(true);
    }
}

// Function to validate password complexity
function validatePassword(password) {
    const complexityRules = [
        { 
            test: password.length >= 8, 
            message: 'Password must be at least 8 characters long.' 
        },
        { 
            test: /[A-Z]/.test(password), 
            message: 'Password must contain at least one uppercase letter.' 
        },
        { 
            test: /[a-z]/.test(password), 
            message: 'Password must contain at least one lowercase letter.' 
        },
        { 
            test: /[0-9]/.test(password), 
            message: 'Password must contain at least one number.' 
        },
        { 
            test: /[!@#$%^&*(),.?":{}|<>]/.test(password), 
            message: 'Password must contain at least one special character.' 
        },
    ];

    const failedRules = complexityRules.filter(rule => !rule.test);

    if (failedRules.length > 0) {
        failedRules.forEach(rule => showToast(rule.message, 'error'));
        return false;
    }

    return true;
}

// Update password in localStorage and send to server
async function updatePassword(userData, newPassword) {
    // Update password in localStorage
    userData.password = newPassword;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Send updated password to the backend
    try {
        const response = await sendUpdatedPasswordToServer(userData.email, newPassword);
        
        if (response.success) {
            showToast('Password updated successfully!', 'success');
            
            // Play success sound if exists
            const clickSound = document.getElementById('click-sound');
            if (clickSound) clickSound.play();

            resetPage();
            
            // Redirect to sign-in page after a short delay
            setTimeout(() => window.location.href = 'signin.html', 3000);
        } else {
            showToast('Failed to update password on the server. Please try again later.', 'error');
        }
    } catch (error) {
        showToast('An error occurred while updating the password. Please try again later.', 'error');
        console.error('Password update error:', error);
    }
}

// Send updated password to the backend server
async function sendUpdatedPasswordToServer(email, password) {
    try {
        const response = await fetch('http://localhost:4000/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Server responded with an error');
        }

        return await response.json();
    } catch (error) {
        console.error('Server update error:', error);
        throw error;
    }
}

// Show profile information
function showProfileInfo(userData) {
    const profilePic = document.getElementById('profile-pic');
    const userName = document.getElementById('user-name');

    profilePic.src = userData.profilePicUrl || 'default-profile-pic.png';
    userName.textContent = userData.name;
    
    toggleVisibility('profile-info', true);
}

// Manage visibility of different sections
function showPasswordUpdateSection() {
    toggleVisibility('user-check', false);
    toggleVisibility('password-update', true);
}

// Convert string to slug
function convertToSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Display toast notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Reset the page
function resetPage() {
    document.getElementById('email').value = '';
    document.getElementById('old-password').value = '';
    document.getElementById('favorite-book').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    
    toggleVisibility('user-check', true);
    toggleVisibility('password-update', false);
    toggleVisibility('profile-info', false);
    
    disableUpdateButton(true);
}

// Toggle visibility of elements
function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? 'block' : 'none';
}

// Enable or disable the update button and change its color
function disableUpdateButton(isDisabled) {
    const button = document.getElementById('update-password-btn');
    button.disabled = isDisabled;
    button.style.backgroundColor = isDisabled ? '#d3d3d3' : '#ff4b2b';
    button.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
}