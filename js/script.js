document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para el Zoom de Imágenes ---

    // Obtener los elementos del DOM
    const modal = document.getElementById('zoom-modal');
    const modalImg = document.getElementById('zoomed-img');
    const closeButton = document.querySelector('.close-button');
    const zoomableImages = document.querySelectorAll('.zoomable');

    // Asignar el evento de clic a cada imagen de la galería
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block'; // Muestra el modal
            modalImg.src = this.src;       // Copia la URL de la imagen clickeada a la imagen del modal
        });
    });

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Asignar evento de clic al botón de cerrar
    closeButton.addEventListener('click', closeModal);

    // Cerrar el modal si se hace clic fuera de la imagen
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Cerrar el modal con la tecla 'Escape'
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // --- Lógica para el Menú Hamburguesa ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        // Activa/desactiva el menú y la animación del icono
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Lógica para el Slider del Header ---
    const swiper = new Swiper('.background-slider', {
        // Opciones
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000, // Cambia de imagen cada 5 segundos
            disableOnInteraction: false,
        },
        // Añade una clase a la diapositiva activa para la animación
        on: {
            init: function () {
                this.slides[this.activeIndex].classList.add('swiper-slide-active-kenburns');
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => slide.classList.remove('swiper-slide-active-kenburns'));
                this.slides[this.activeIndex].classList.add('swiper-slide-active-kenburns');
            }
        }
    });

    // --- Lógica para resaltar el enlace activo en el menú al hacer scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-item a');

    function changeNavOnScroll() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) { // El -150 es un offset para activar el enlace un poco antes
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', changeNavOnScroll);
});
