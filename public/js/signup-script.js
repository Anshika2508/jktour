document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Sign In Successful!');
    const email = document.getElementById('email').value;

    // Store the email in localStorage
    localStorage.setItem('userEmail', email);

    // Redirect to the home page (you can change the URL as per your home page)
    window.location.href = 'index.html';
});
