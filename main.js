// OOAS - Servicios de Mantenimiento Aéreo Profesional
// JavaScript mejorado con funcionalidades profesionales

document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileNavLinks = document.querySelectorAll('.nav-menu a');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
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

    // Funcionalidad simple para mostrar explicaciones de valores
    const valoresItems = document.querySelectorAll('.valores-lista li');
    const valoresLista = document.querySelector('.valores-lista');
    const explicacionBox = document.getElementById('explicacion-box');
    const explicacionTitulo = document.getElementById('explicacion-titulo');
    const explicacionTexto = document.getElementById('explicacion-texto');
    
    // Posicionar el cuadro una sola vez, al lado de la lista completa
    let posicionInicializada = false;
    
    function inicializarPosicion(forzar = false) {
        if (posicionInicializada && !forzar) return;
        
        if (valoresLista) {
            const rect = valoresLista.getBoundingClientRect();
            const boxWidth = 450;
            const padding = 20;
            const windowWidth = window.innerWidth;
            
            // Calcular posición: al lado derecho de la lista
            let leftPosition = rect.right + 25;
            
            // Ajustar si no cabe a la derecha
            if (leftPosition + boxWidth > windowWidth - padding) {
                leftPosition = rect.left - boxWidth - 25;
                if (leftPosition < padding) {
                    leftPosition = padding;
                }
            }
            
            // Posición vertical: alineada con el inicio de la lista
            let topPosition = rect.top;
            if (topPosition < padding) {
                topPosition = padding;
            }
            
            // Aplicar posición fija
            explicacionBox.style.top = topPosition + 'px';
            explicacionBox.style.left = leftPosition + 'px';
            posicionInicializada = true;
        }
    }

    valoresItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const valor = this.textContent.trim();
            const explicacion = this.getAttribute('data-explicacion');
            
            if (!explicacion) return;
            
            // Inicializar posición solo la primera vez
            if (!posicionInicializada) {
                inicializarPosicion();
            }
            
            const yaEstabaMostrado = explicacionBox.classList.contains('mostrar');
            const content = explicacionBox.querySelector('.explicacion-content');
            
            // Si ya estaba mostrado, agregar efecto de flash/pantallazo mejorado
            if (yaEstabaMostrado) {
                // Remover clases anteriores si existen
                content.classList.remove('flash', 'mostrar-nuevo');
                
                // Forzar reflow para reiniciar animación
                void content.offsetWidth;
                
                // Agregar clases de animación
                content.classList.add('flash', 'mostrar-nuevo');
                
                // Actualizar contenido en el momento del flash
                setTimeout(() => {
                    explicacionTitulo.textContent = valor;
                    explicacionTexto.textContent = explicacion;
                }, 250);
                
                // Remover clases después de la animación
                setTimeout(() => {
                    content.classList.remove('flash', 'mostrar-nuevo');
                }, 800);
            } else {
                // Primera vez: actualizar contenido inmediatamente
                explicacionTitulo.textContent = valor;
                explicacionTexto.textContent = explicacion;
            }
            
            // Mostrar el cuadro (ya está posicionado)
            explicacionBox.classList.add('mostrar');
        });
    });
    
    // Recalcular posición si se hace scroll o se redimensiona la ventana
    window.addEventListener('resize', function() {
        if (explicacionBox.classList.contains('mostrar')) {
            inicializarPosicion(true);
        }
    });
    
    window.addEventListener('scroll', function() {
        if (explicacionBox.classList.contains('mostrar')) {
            inicializarPosicion(true);
        }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!explicacionBox.contains(e.target) && !e.target.closest('.valores-lista li')) {
            explicacionBox.classList.remove('mostrar');
        }
    });
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

// Función para cerrar el cuadro de explicación
function cerrarExplicacion() {
    const explicacionBox = document.getElementById('explicacion-box');
    if (explicacionBox) {
        explicacionBox.classList.remove('mostrar');
    }
}
