document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get user input values
    const name = document.getElementById('userName').value;
    const feedback = document.getElementById('feedbackText').value;

    // Display submitted feedback
    document.getElementById('displayName').textContent = name;
    document.getElementById('displayFeedback').textContent = feedback;
    document.getElementById('feedbackDisplay').style.display = 'block';

    // Clear the form after submission
    document.getElementById('feedbackForm').reset();
});
