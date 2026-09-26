// Header scroll effect
const header = document.getElementById('header');
const hero = document.querySelector('.hero');

function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Reviews slider
const track = document.querySelector('.reviews__track');
const reviews = document.querySelectorAll('.review');
const dotsContainer = document.getElementById('reviewDots');
let currentReview = 0;

reviews.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList = 'reviews__dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToReview(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.reviews__dot');

function goToReview(index) {
    currentReview = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

document.getElementById('prevReview').addEventListener('click', () => {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    goToReview(currentReview);
});

document.getElementById('nextReview').addEventListener('click', () => {
    currentReview = (currentReview + 1) % reviews.length;
    goToReview(currentReview);
});

// Auto-advance reviews
let reviewInterval = setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    goToReview(currentReview);
}, 6000);

document.getElementById('reviewsSlider').addEventListener('mouseenter', () => {
    clearInterval(reviewInterval);
});

document.getElementById('reviewsSlider').addEventListener('mouseleave', () => {
    reviewInterval = setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        goToReview(currentReview);
    }, 6000);
});

// Booking form
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;

    let message = `Заявка на запись в салон Familia%0A%0AИмя: ${name}%0AТелефон: ${phone}`;
    if (service) message += `%0AУслуга: ${service}`;
    if (date) message += `%0AДата: ${date}`;

    window.open(`tel:+74999610545`, '_self');
    alert(`Спасибо, ${name}! Мы перезвоним вам в течение 15 минут для подтверждения записи.`);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
