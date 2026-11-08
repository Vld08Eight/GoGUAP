/* ============================================================
   GoGUAP — поведение страницы.
   Каждая init-функция отвечает ровно за одну возможность (SRP)
   и подключается одним вызовом в конце файла.
   Скрипт подключается с defer, поэтому DOM уже готов.
   ============================================================ */

'use strict';

// Классическая шутка для кнопки «Записаться»
const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

/* Мобильное меню: состояние хранится в одном месте, а не
   дублируется по двум обработчикам (DRY) */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('main-nav');

    const setMenu = (open) => {
        nav.classList.toggle('open', open);
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };

    toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });
}

/* Появление карточек при прокрутке */
function initRevealOnScroll() {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card) => {
        card.classList.add('reveal');
        observer.observe(card);
    });
}

/* Кнопка «наверх» */
function initToTopButton() {
    const button = document.querySelector('.to-top');

    window.addEventListener('scroll', () => {
        button.classList.toggle('show', window.scrollY > 600);
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* Форма записи: после стандартной валидации полей «отправляет»
   тестировщика туда, куда уже все догадались */
function initJoinForm() {
    const form = document.getElementById('join-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        window.open(RICKROLL_URL, '_blank', 'noopener');
    });
}

initMobileMenu();
initRevealOnScroll();
initToTopButton();
initJoinForm();
