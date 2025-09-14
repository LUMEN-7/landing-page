const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// CORREÇÃO: Garantir que menu mobile não fica visível no desktop
function checkScreenSize() {
    if (window.innerWidth >= 769) {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Verificar ao carregar e redimensionar a janela
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

//about
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Atualiza botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Atualiza conteúdos
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');

    });
});

// Expandir cards da equipe
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Não fechar se clicar em um link
        if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') return;

        // Fecha outros cards abertos
        cards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                otherCard.classList.remove('expanded');
            }
        });

        // Alterna o card clicado
        card.classList.toggle('expanded');
    });
});

// Botão de voltar ao topo
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Suporte a gestos de swipe para trocar entre abas
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const minSwipeDistance = 50; // Distância mínima para considerar um swipe
    const currentTab = document.querySelector('.tab-button.active').getAttribute('data-tab');

    if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
        // Swipe para a esquerda - próxima aba
        if (currentTab === 'about') {
            document.querySelector('[data-tab="team"]').click();
        }
    }

    if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
        // Swipe para a direita - aba anterior
        if (currentTab === 'team') {
            document.querySelector('[data-tab="about"]').click();
        }
    }
}

// Função que abre/fecha cards
function toggleCard(card, isMobile) {
    if (isMobile) {
        // Fecha outros cards
        cards.forEach(c => {
            if (c !== card) c.classList.remove('mobile-active');
        });
        card.classList.toggle('mobile-active');
    } else {
        card.classList.toggle('active');
    }
}

// Evento para cada card
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Não fecha o card se clicar em um link
        if (e.target.closest('a')) return;

        toggleCard(card, window.innerWidth <= 767);
    });
});

// Impede clique nos links de fechar cards no mobile
document.querySelectorAll('.card a').forEach(link => {
    link.addEventListener('click', e => e.stopPropagation());
});

// Fechar card ao clicar fora (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 767) {
        let clickInsideCard = false;
        cards.forEach(card => {
            if (card.contains(e.target)) clickInsideCard = true;
        });
        if (!clickInsideCard) {
            cards.forEach(card => card.classList.remove('mobile-active'));
        }
    }
});
