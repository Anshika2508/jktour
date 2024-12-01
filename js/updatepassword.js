// Add event listeners for form inputs
document.getElementById('check-email-btn').addEventListener('click', function () {
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

document.getElementById('update-password-btn').addEventListener('click', function () {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const oldPassword = document.getElementById('old-password').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const favoriteBookSlug = convertToSlug(document.getElementById('favorite-book').value.trim());

    if (!validatePassword(newPassword)) return;

    if (document.getElementById('know-password').checked) {
        if (oldPassword === userData.password) {
            updatePassword(userData, newPassword);
        } else {
            showToast('Incorrect old password. Please try again.', 'error');
        }
    } else if (favoriteBookSlug === userData.favoriteBook) {
        updatePassword(userData, newPassword);
    } else {
        showToast('Incorrect favorite book. Please try again.', 'error');
    }
});

// Real-time validation for password fields
document.getElementById('new-password').addEventListener('input', validatePasswords);
document.getElementById('confirm-password').addEventListener('input', validatePasswords);

// Back button resets the page
document.getElementById('back-btn').addEventListener('click', resetPage);

// Toggle between "I know my password" and "I don't know my password"
document.getElementById('know-password').addEventListener('change', function () {
    const isChecked = this.checked;
    toggleVisibility('old-password', isChecked);
    toggleVisibility('favorite-book', !isChecked);
});

// Validate passwords and manage button state
function validatePasswords() {
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (!newPassword || !confirmPassword) {
        disableUpdateButton(true);
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        disableUpdateButton(true);
        return;
    }

    if (validatePassword(newPassword)) {
        disableUpdateButton(false); // Enable the button when all validations pass
    } else {
        disableUpdateButton(true);
    }
}

// Function to validate password complexity
function validatePassword(password) {
    const complexityRules = [
        { test: password.length >= 8, message: 'Password must be at least 8 characters long.' },
        { test: /[A-Z]/.test(password), message: 'Password must contain at least one uppercase letter.' },
        { test: /[a-z]/.test(password), message: 'Password must contain at least one lowercase letter.' },
        { test: /[0-9]/.test(password), message: 'Password must contain at least one number.' },
        { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: 'Password must contain at least one special character.' },
    ];

    const errors = complexityRules.filter(rule => !rule.test);

    if (errors.length > 0) {
        errors.forEach(error => showToast(error.message, 'error'));
        return false;
    }

    return true;
}

// Update password in localStorage
function updatePassword(userData, newPassword) {
    userData.password = newPassword;
    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('click-sound').play();
    showToast('Password updated successfully!', 'success');
    resetPage();
    setTimeout(() => window.location.href = 'signin.html', 6000); // Redirect to sign-in page after 6 seconds
}

// Show profile information
function showProfileInfo(userData) {
    const profilePic = userData.profilePicUrl || 'default-profile-pic.png';
    document.getElementById('profile-pic').src = profilePic;
    document.getElementById('user-name').textContent = userData.name;
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
    disableUpdateButton(true); // Reset button state
}

// Toggle visibility of elements
function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? 'block' : 'none';
}

// Enable or disable the update button and change its color
function disableUpdateButton(isDisabled) {
    const button = document.getElementById('update-password-btn');
    button.disabled = isDisabled;
    button.style.backgroundColor = isDisabled ? '#d3d3d3' : '#ff4b2b'; // Gray when disabled, red when enabled
    button.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
}
