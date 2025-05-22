// Esperar pelo carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    const menuToggle = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Função para verificar a posição de rolagem
    function checkScroll() {
        // Adicionar classe ao cabeçalho quando rolar
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            backToTop.classList.add('active');
        } else {
            header.style.padding = '20px 0';
            backToTop.classList.remove('active');
        }
        
        // Animar barras de habilidades quando visíveis
        animateSkillBars();
    }
    
    // Função para animar barras de habilidades quando visíveis
    function animateSkillBars() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > sectionTop - windowHeight + 200) {
            skillLevels.forEach(level => {
                const width = level.style.width;
                level.style.width = '0';
                setTimeout(() => {
                    level.style.width = width;
                }, 200);
            });
        }
    }
    
    // Função para alternar menu mobile
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Animar barras do hamburger
        const bars = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    // Função para filtrar projetos
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Função para lidar com o envio do formulário
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validar formulário
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Simulação de envio (em um caso real, você enviaria para um backend)
        alert(`Mensagem enviada com sucesso!\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${subject}\nMensagem: ${message}`);
        
        // Limpar formulário
        contactForm.reset();
    }
    
    // Função para rolagem suave ao clicar em links de âncora
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            const headerHeight = header.offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
            
            // Atualizar URL
            history.pushState(null, null, hash);
        }
    }
    
    // Função para atualizar links ativos no menu
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const headerHeight = header.offsetHeight;
            
            if (window.scrollY >= sectionTop - headerHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Função para animação de digitação no hero
    function typeWriter(element, text, speed, delay = 0) {
        let i = 0;
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, speed);
        }, delay);
    }
    
    // Efeito de digitação para o título (opcional)
    // const heroTitle = document.querySelector('.hero-content h1');
    // const originalText = heroTitle.textContent;
    // heroTitle.textContent = '';
    // typeWriter(heroTitle, originalText, 100, 500);
    
    // Event Listeners
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('scroll', updateActiveMenu);
    menuToggle.addEventListener('click', toggleMenu);
    
    // Adicionar evento de clique aos botões de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Filtrar projetos
            const category = this.getAttribute('data-filter');
            filterProjects(category);
        });
    });
    
    // Adicionar evento de envio ao formulário
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Adicionar evento de clique aos links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Inicializar
    checkScroll();
    updateActiveMenu();
    
    // Adicionar classe para animar elementos quando a página carrega
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});
