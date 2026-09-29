const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileBook = document.getElementById('mobileBook');
const heroImg = document.getElementById('heroImg');

const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    mobileBook.classList.toggle('visible', y > window.innerHeight * 0.6);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            if (heroImg && window.scrollY < window.innerHeight) {
                heroImg.style.transform = `translateY(${window.scrollY * 0.18}px) scale(1.05)`;
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const track = document.getElementById('testimonialsTrack');
const slides = track.children;
const dotsContainer = document.getElementById('testimonialsDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('testimonials__dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.children;

function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === currentSlide);
    }
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

let autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
track.parentElement.addEventListener('mouseleave', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
});

let touchStartX = 0;
track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
        goToSlide(currentSlide + (diff < 0 ? 1 : -1));
    }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});
