'use strict';

/**
 * Global Constants and Event Listeners
 */
const header = document.querySelector('[data-header]');
const navToggleBtn = document.querySelector('[data-nav-toggler]');
const navbar = document.querySelector('[data-navbar]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

const toggleNavbar = function () {
    navbar.classList.toggle('active');
    navToggleBtn.classList.toggle('active');
    document.body.classList.toggle('active');
};

navToggleBtn.addEventListener('click', toggleNavbar);

// Close navbar when clicking on a link
const navLinks = document.querySelectorAll('[data-nav-link]');
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            toggleNavbar();
        }
    });
}

// Add 'active' class to header/back-top-btn on scroll
window.addEventListener('scroll', function () {
    if (window.scrollY >= 50) {
        header.classList.add('active');
        backTopBtn.classList.add('active');
    } else {
        header.classList.remove('active');
        backTopBtn.classList.remove('active');
    }
});

/**
 * COUNTDOWN TIMER LOGIC
 */
const countdown = function () {
    // Set the target date: 5 NOVEMBER 2025 (Assuming 00:00:00 local time)
    const targetDate = new Date("November 5, 2025 00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) return;

    const updateCountdown = function() {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = targetDate - now;

        // Time calculations for days, hours, and minutes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // Note: The timer updates every minute (60000ms)

        // If the count down is finished
        if (distance < 0) {
            clearInterval(timerInterval);
            countdownElement.innerHTML = `
                <div class='countdown-item'>
                    <span class='countdown-number'>LIVE</span>
                    <span class='countdown-label'>NOW</span>
                </div>
            `;
            return;
        }

        // Output the result in the element
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${String(days).padStart(2, '0')}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${String(hours).padStart(2, '0')}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
                <span class="countdown-label">Minutes</span>
            </div>
        `;
    };

    // Update the count down every minute (60 seconds)
    const timerInterval = setInterval(updateCountdown, 60000); 
    updateCountdown(); // Run immediately to avoid 1-minute delay
};


/**
 * SCROLL REVEAL (Animation on scroll)
 */
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = function () {
    for (let i = 0; i < revealElements.length; i++) {
        // Check if element is within 80% of viewport height
        const isElementVisible = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

        if (isElementVisible) {
            revealElements[i].classList.add('revealed');
        } else {
             // Optional: remove 'revealed' class when element scrolls out
             revealElements[i].classList.remove('revealed');
        }
    }
}


/**
 * CUSTOM CURSOR (Desktop only)
 */
const cursor = document.querySelector('[data-cursor]');
const anchorElements = document.querySelectorAll('a, button'); // Elements that change cursor style

document.addEventListener('mousemove', function (event) {
    // Move the custom cursor circle
    if (cursor) {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }
});

// Add 'hover' class to change cursor size when hovering over interactive elements
for (let i = 0; i < anchorElements.length; i++) {
    anchorElements[i].addEventListener('mouseenter', function () {
        if (cursor) cursor.classList.add('hover');
    });

    anchorElements[i].addEventListener('mouseleave', function () {
        if (cursor) cursor.classList.remove('hover');
    });
}


// Initialize features on page load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
window.addEventListener('load', countdown);
