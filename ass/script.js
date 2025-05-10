// Popup functionality with interval
let popupInterval;

function showPopup() {
    const popup = document.getElementById('promo-popup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function hidePopup() {
    const popup = document.getElementById('promo-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function startPopupInterval() {
    // Show popup immediately when page loads
    showPopup();
    
    // Set interval to show popup every 3 minutes (180000 milliseconds)
    popupInterval = setInterval(showPopup, 180000);
}

// Initialize popup functionality when DOM is loaded
// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('promo-popup');
    const closeButton = document.querySelector('.close-popup');
    const dontShowAgain = document.getElementById('dont-show-again');

    // Function to show popup
    function showPopup() {
        if (popup) {
            popup.style.display = 'flex';
        }
    }

    // Function to hide popup
    function hidePopup() {
        if (popup) {
            popup.style.display = 'none';
            
            // If "Don't show again" is checked, set a cookie
            if (dontShowAgain && dontShowAgain.checked) {
                const expiryDate = new Date();
                expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
                document.cookie = `popupDismissed=true; expires=${expiryDate.toUTCString()}; path=/`;
            }
        }
    }

    // Check if popup should be shown
    function shouldShowPopup() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            if (cookie.trim().startsWith('popupDismissed=')) {
                return false;
            }
        }
        return true;
    }

    // Show popup after 3 seconds if it should be shown
    if (shouldShowPopup()) {
        setTimeout(showPopup, 300000);
    }

    // Close popup when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', hidePopup);
    }

    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                hidePopup();
            }
        });
    }
});

// Optional: Pause popup when user is not active
let userActivityTimeout;

function resetUserActivity() {
    clearTimeout(userActivityTimeout);
    userActivityTimeout = setTimeout(() => {
        // Pause popup when user is inactive for 5 minutes
        clearInterval(popupInterval);
    }, 300000); // 5 minutes
}

// Track user activity
document.addEventListener('mousemove', resetUserActivity);
document.addEventListener('keypress', resetUserActivity);
document.addEventListener('click', resetUserActivity);
document.addEventListener('scroll', resetUserActivity);

// Resume popup when user becomes active again
document.addEventListener('mousemove', function() {
    if (!popupInterval) {
        startPopupInterval();
    }
});