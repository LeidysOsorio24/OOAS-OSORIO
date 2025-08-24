// OOAS - Servicios de Mantenimiento Aéreo Profesional
// JavaScript mejorado con funcionalidades profesionales

document.addEventListener('DOMContentLoaded', () => {
    // Carrusel automático mejorado
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let currentIndex = 0;
    let interval;

    // Función para cambiar de slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }
    
    // Función para slide anterior
    function previousSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    // Función para actualizar el carrusel
    function updateCarousel() {
        const translateX = -(currentIndex * 33.333);
        carouselImages.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar indicadores
        updateIndicators();
    }
    
    // Función para actualizar indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Iniciar carrusel automático
    function startCarousel() {
        interval = setInterval(nextSlide, 5000);
    }

    // Pausar carrusel al hacer hover
    function pauseCarousel() {
        clearInterval(interval);
    }

    // Reanudar carrusel
    function resumeCarousel() {
        startCarousel();
    }

    // Event listeners para el carrusel
    if (carouselImages) {
        carouselImages.addEventListener('mouseenter', pauseCarousel);
        carouselImages.addEventListener('mouseleave', resumeCarousel);
        startCarousel();
        
        // Event listeners para indicadores
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
    }

    // Animaciones de aparición al hacer scroll mejoradas
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Añadir delay escalonado para las imágenes
                const img = entry.target.querySelector('.section-img img');
                if (img) {
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
        // Preparar imágenes para animación
        const img = section.querySelector('.section-img img');
        if (img) {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });

    // Efecto de parallax sutil para el header
    let ticking = false;
    function updateHeader() {
        const scroll = window.scrollY;
        const header = document.querySelector('header');
        
        if (scroll > 100) {
            header.style.background = 'rgba(5, 29, 59, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#051d3b';
            header.style.backdropFilter = 'none';
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Navegación suave mejorada
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Indicador de progreso de scroll
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Crear o actualizar barra de progreso
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Animación de contador para estadísticas (si se añaden)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Lazy loading para imágenes
    const imagesToLazyLoad = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    imagesToLazyLoad.forEach(img => imageObserver.observe(img));

    // Mejoras de accesibilidad
    document.addEventListener('keydown', (e) => {
        // Navegación con teclado
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Preloader profesional
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Console log profesional
    console.log(`
    🛩️  OOAS - Servicios de Mantenimiento Aéreo Profesional
    ✈️  Bienvenido a nuestro sitio web
    🔧  Especialistas en mantenimiento y soluciones técnicas
    📧  Contacto: info@ooas.aero
    `);
});

// Funciones globales para los botones del carrusel
function nextSlide() {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let currentIndex = parseInt(document.querySelector('.carousel-indicator.active').dataset.index);
    
    currentIndex = (currentIndex + 1) % images.length;
    updateCarouselGlobal(currentIndex);
}

function previousSlide() {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let currentIndex = parseInt(document.querySelector('.carousel-indicator.active').dataset.index);
    
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarouselGlobal(currentIndex);
}

function updateCarouselGlobal(index) {
    const carouselImages = document.querySelector('.carousel-images');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    const translateX = -(index * 33.333);
    carouselImages.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}
