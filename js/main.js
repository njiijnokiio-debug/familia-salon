// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .service-item, .reviews__dot').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// Header scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.about__title, .about__text, .about__stats, .services__title, .service-item, .masters__title, .master, .reviews__title, .booking__title, .booking__text, .booking__form, .contacts__title, .contact-block');

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Reviews slider
const track = document.querySelector('.reviews__track');
const reviews = document.querySelectorAll('.review');
const dotsContainer = document.getElementById('reviewDots');
let currentReview = 0;

reviews.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'reviews__dot' + (index === 0 ? ' active' : '');
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

let reviewInterval = setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    goToReview(currentReview);
}, 7000);

document.getElementById('reviewsSlider').addEventListener('mouseenter', () => clearInterval(reviewInterval));
document.getElementById('reviewsSlider').addEventListener('mouseleave', () => {
    reviewInterval = setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        goToReview(currentReview);
    }, 7000);
});

// Booking form
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Спасибо, ${name}! Мы перезвоним вам в течение 15 минут.`);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
