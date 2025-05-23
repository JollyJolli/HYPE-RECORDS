// HYPE RECORDS - Funcionalidades JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);

    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Efecto de scroll en el header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Activar links de navegación según la sección visible
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Reproductor de audio para los sound pads
    const soundPads = document.querySelectorAll('.sound-pad');
    let activeAudio = null;

    soundPads.forEach(pad => {
        pad.addEventListener('click', function() {
            const soundId = this.getAttribute('data-sound');
            const audio = document.getElementById(soundId);
            
            // Si hay un audio activo, detenerlo y resetear el pad
            if (activeAudio && activeAudio !== audio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
                document.querySelector('.sound-pad.active').classList.remove('active');
            }
            
            // Si el audio está pausado o no ha comenzado, reproducirlo
            if (audio.paused) {
                audio.play();
                this.classList.add('active');
                activeAudio = audio;
                
                // Animación de la visualización del pad
                const padVisual = this.querySelector('.pad-visual');
                padVisual.style.animation = 'pulse 0.5s infinite alternate';
            } else {
                // Si el audio está reproduciéndose, pausarlo
                audio.pause();
                audio.currentTime = 0;
                this.classList.remove('active');
                activeAudio = null;
                
                // Detener la animación
                const padVisual = this.querySelector('.pad-visual');
                padVisual.style.animation = 'none';
            }
        });
    });

    // Animación para las historias
    const storyAvatars = document.querySelectorAll('.story-avatar');
    storyAvatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío de formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Mostrar mensaje de éxito
                const formGroups = this.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                submitBtn.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <h3>¡Mensaje Enviado!</h3>
                    <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                    <button class="btn primary-btn" id="reset-form">Enviar otro mensaje</button>
                `;
                this.appendChild(successMessage);
                
                // Resetear formulario
                document.getElementById('reset-form').addEventListener('click', function() {
                    contactForm.reset();
                    successMessage.remove();
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    submitBtn.style.display = 'block';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            }, 2000);
        });
    }

    // Efecto parallax en la sección hero
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Animación de entrada para las secciones
    const animateSections = function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateSections);
    animateSections(); // Ejecutar al cargar la página
});