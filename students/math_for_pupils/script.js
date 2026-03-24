document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Подсветка активного раздела
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Инициализация темной темы
    function initTheme() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'darkModeToggle';
        darkModeToggle.innerHTML = '🌓';
        darkModeToggle.title = 'Переключить тему';
        darkModeToggle.style.position = 'fixed';
        darkModeToggle.style.bottom = '20px';
        darkModeToggle.style.right = '20px';
        darkModeToggle.style.zIndex = '1000';
        darkModeToggle.style.fontSize = '24px';
        darkModeToggle.style.background = 'var(--primary-color)';
        darkModeToggle.style.color = 'white';
        darkModeToggle.style.border = 'none';
        darkModeToggle.style.borderRadius = '50%';
        darkModeToggle.style.width = '50px';
        darkModeToggle.style.height = '50px';
        darkModeToggle.style.cursor = 'pointer';
        darkModeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        document.body.appendChild(darkModeToggle);
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Проверяем сохраненную тему
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Интерактивные подсказки
    function addTooltips() {
        document.querySelectorAll('.solution').forEach(solution => {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-solution';
            toggleBtn.textContent = 'Показать решение';
            solution.style.display = 'none';
            solution.parentNode.insertBefore(toggleBtn, solution);
            
            toggleBtn.addEventListener('click', () => {
                if (solution.style.display === 'none') {
                    solution.style.display = 'block';
                    toggleBtn.textContent = 'Скрыть решение';
                } else {
                    solution.style.display = 'none';
                    toggleBtn.textContent = 'Показать решение';
                }
            });
        });
    }

    // Кнопка "Наверх"
    function addBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.innerHTML = '↑';
        backToTop.title = 'Наверх';
        backToTop.style.display = 'none';
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '80px';
        backToTop.style.right = '20px';
        backToTop.style.zIndex = '99';
        backToTop.style.fontSize = '20px';
        backToTop.style.background = 'var(--primary-color)';
        backToTop.style.color = 'white';
        backToTop.style.border = 'none';
        backToTop.style.borderRadius = '50%';
        backToTop.style.width = '50px';
        backToTop.style.height = '50px';
        backToTop.style.cursor = 'pointer';
        backToTop.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Ленивая загрузка изображений
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Прогресс чтения
    function addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = 'var(--primary-color)';
        progressBar.style.zIndex = '1000';
        progressBar.style.transition = 'width 0.2s ease';
        progressBar.style.width = '0';
        
        document.body.prepend(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight;
            const winHeight = window.innerHeight;
            const progress = (scrollTop / (docHeight - winHeight)) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // Инициализация всех функций
    initTheme();
    addTooltips();
    addBackToTop();
    lazyLoadImages();
    addReadingProgress();

    // Заполнение тестовых вопросов (пример)
    function initQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
            // Здесь можно добавить динамическую генерацию тестов
            // или загрузку вопросов из JSON
        }
    }
    initQuiz();
});