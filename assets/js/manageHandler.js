// manageHandler.js

document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newDate = document.getElementById('countdownDate').value;
    if (newDate) {
        localStorage.setItem('countDownDate', new Date(newDate).getTime());
        alert('Countdown date updated successfully!');
    } else {
        alert('Please enter a valid date.');
    }
});

// Pre-fill the form with the current countdown date if available
const savedDate = localStorage.getItem('countDownDate');
if (savedDate) {
    const currentDate = new Date(parseInt(savedDate)).toISOString().slice(0, 16);
    document.getElementById('countdownDate').value = currentDate;
}
