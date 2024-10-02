// manageHandler.js

// Handle form submission
document.getElementById('countdownForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values for both countdown date and next bread sale date
    const countDownDate = document.getElementById('countdownDate').value;
    const nextBreadSellDate = document.getElementById('nextBreadSellDate').value;

    if (countDownDate && nextBreadSellDate) {
        // Convert to timestamps and store in localStorage
        localStorage.setItem('countDownDate', new Date(countDownDate).getTime());
        localStorage.setItem('nextBreadSellDate', new Date(nextBreadSellDate).getTime());

        alert('Countdown and next bread sale date updated successfully!');
    } else {
        alert('Please enter valid dates.');
    }
});

// Pre-fill the form with the current values if available
const savedCountDownDate = localStorage.getItem('countDownDate');
const savedNextBreadSellDate = localStorage.getItem('nextBreadSellDate');

if (savedCountDownDate) {
    const currentCountDownDate = new Date(parseInt(savedCountDownDate)).toISOString().slice(0, 16);
    document.getElementById('countdownDate').value = currentCountDownDate;
}

if (savedNextBreadSellDate) {
    const currentNextBreadSellDate = new Date(parseInt(savedNextBreadSellDate)).toISOString().slice(0, 16);
    document.getElementById('nextBreadSellDate').value = currentNextBreadSellDate;
}
