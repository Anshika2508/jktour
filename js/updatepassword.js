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

document.getElementById('back-btn').addEventListener('click', resetPage);

document.getElementById('know-password').addEventListener('change', function () {
    const isChecked = this.checked;
    toggleVisibility('old-password', isChecked);
    toggleVisibility('favorite-book', !isChecked);
});

document.getElementById('new-password').addEventListener('input', validatePasswords);
document.getElementById('confirm-password').addEventListener('input', validatePasswords);

function validatePasswords() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        disableUpdateButton(true);
    } else {
        showToast('Passwords matched.', 'success');
        disableUpdateButton(!validatePassword(newPassword));
    }
}

function validatePassword(password) {
    const complexityRules = [
        { test: password.length >= 8, message: 'Password must be at least 8 characters long.' },
        { test: /[A-Z]/.test(password), message: 'Password must contain at least one uppercase letter.' },
        { test: /[a-z]/.test(password), message: 'Password must contain at least one lowercase letter.' },
        { test: /[0-9]/.test(password), message: 'Password must contain at least one number.' },
        { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: 'Password must contain at least one special character.' },
    ];

    for (const rule of complexityRules) {
        if (!rule.test) {
            showToast(rule.message, 'error');
            return false;
        }
    }

    return true;
}

function updatePassword(userData, newPassword) {
    userData.password = newPassword;
    localStorage.setItem('userData', JSON.stringify(userData));
    const clickSound = document.getElementById('click-sound');
    clickSound.play();
    showToast('Password updated successfully!', 'success');
    resetPage();
    document.getElementById('message').innerHTML = 'Password has been updated, you will be redirected to sign in shortly';
    setTimeout(() => {
       
    }, 6000); // 3 seconds delay
    
    showToast('Password has been updated, you will be redirected to sign in shortly', 'success');

    setTimeout(() => {
        window.location.href = 'signin.html'; // Redirect to sign-in page
    }, 6000); // 3 seconds delay
    
}

function showProfileInfo(userData) {
    const profilePic = userData.profilePicUrl || 'default-profile-pic.png';
    document.getElementById('profile-pic').src = profilePic;
    document.getElementById('user-name').textContent = userData.name;
    toggleVisibility('profile-info', true);
}

function showPasswordUpdateSection() {
    toggleVisibility('user-check', false);
    toggleVisibility('password-update', true);
}

function convertToSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function resetPage() {
    document.getElementById('email').value = '';
    document.getElementById('old-password').value = '';
    document.getElementById('favorite-book').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    toggleVisibility('user-check', true);
    toggleVisibility('password-update', false);
    toggleVisibility('profile-info', false);
}

function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? 'block' : 'none';
}

function disableUpdateButton(isDisabled) {
    document.getElementById('update-password-btn').disabled = isDisabled;
}
