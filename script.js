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