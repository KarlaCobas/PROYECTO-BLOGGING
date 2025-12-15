        document.addEventListener('DOMContentLoaded', function() {
            const hamburgerMenu = document.getElementById('hamburgerMenu');
            const mainNav = document.getElementById('mainNav');
            const navLinks = document.querySelectorAll('.nav-link');
            
            hamburgerMenu.addEventListener('click', function() {
                hamburgerMenu.classList.toggle('active');
                mainNav.classList.toggle('active');
            });
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    
                    navLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            document.addEventListener('click', function(event) {
                const isClickInsideNav = mainNav.contains(event.target);
                const isClickOnHamburger = hamburgerMenu.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            });
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    
                    if (targetId !== '#') {
                        e.preventDefault();
                        const targetElement = document.querySelector(targetId);
                        
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
            
            const statNumbers = document.querySelectorAll('.stat-number');
            const observerOptions = {
                threshold: 0.5
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumber = entry.target;
                        const target = parseInt(statNumber.getAttribute('data-count'));
                        const duration = 2000;
                        const step = target / (duration / 16); 
                        let current = 0;
                        
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            statNumber.textContent = Math.floor(current);
                        }, 16);
                        
                        observer.unobserve(statNumber);
                    }
                });
            }, observerOptions);
            
            statNumbers.forEach(statNumber => {
                observer.observe(statNumber);
            });
            
            const articleModal = document.getElementById('articleModal');
            const modalClose = document.getElementById('modalClose');
            const closeModalBtn = document.getElementById('closeModal');
            const articleLinks = document.querySelectorAll('.article-link');
            const fullArticleLink = document.getElementById('fullArticleLink');
            
            const articles = {
                1: {
                    category: "Desarrollo Web",
                    title: "Tendencias de Desarrollo Frontend en 2024",
                    date: "15 Mayo, 2024",
                    author: "Carlos Rodríguez",
                    comments: "12 comentarios",
                    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    content: `<p>El desarrollo frontend continúa evolucionando a un ritmo acelerado, y 2024 no es la excepción. En este artículo exploramos las tendencias más importantes que están moldeando el futuro del desarrollo web.</p>
                    
                    <h3>Frameworks y Librerías</h3>
                    <p>React, Vue.js y Angular siguen dominando el ecosistema frontend, pero cada vez vemos más adopción de frameworks más nuevos como Svelte y Solid.js, que prometen mejor rendimiento y una experiencia de desarrollo más simple.</p>
                    
                    <h3>Herramientas de Desarrollo</h3>
                    <p>Vite se ha consolidado como el bundler preferido por muchos desarrolladores, reemplazando a Webpack en muchos proyectos nuevos gracias a su velocidad y configuración simplificada.</p>
                    
                    <p>Además, TypeScript continúa ganando popularidad, con más del 80% de los desarrolladores encuestados indicando que lo utilizan en sus proyectos principales.</p>
                    
                    <p>Estas son solo algunas de las tendencias que están definiendo el desarrollo frontend en 2024. Para mantenerse competitivo, es crucial estar al tanto de estas evoluciones y adaptarse continuamente.</p>`,
                    fullArticle: "#"
                },
                2: {
                    category: "Diseño UI/UX",
                    title: "Principios de Diseño Accesible para Todos",
                    date: "8 Mayo, 2024",
                    author: "Laura Méndez",
                    comments: "8 comentarios",
                    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                    content: `<p>El diseño accesible no es solo una buena práctica, es una necesidad ética y legal. En este artículo exploramos los principios fundamentales para crear interfaces que sean utilizables por todas las personas, independientemente de sus capacidades.</p>
                    
                    <h3>Contraste y Legibilidad</h3>
                    <p>Uno de los aspectos más importantes es garantizar un contraste adecuado entre texto y fondo. Las pautas WCAG recomiendan una relación de contraste de al menos 4.5:1 para texto normal y 3:1 para texto grande.</p>
                    
                    <h3>Navegación por Teclado</h3>
                    <p>Todas las funcionalidades deben ser accesibles mediante teclado. Esto incluye no solo la navegación básica, sino también formularios, menús y elementos interactivos.</p>
                    
                    <h3>Textos Alternativos</h3>
                    <p>Las imágenes deben contar con textos alternativos descriptivos que permitan a usuarios con discapacidad visual entender el contenido visual de la página.</p>
                    
                    <p>Implementar estos principios no solo beneficia a usuarios con discapacidades, sino que mejora la experiencia para todos los usuarios y puede incluso mejorar el SEO de tu sitio.</p>`,
                    fullArticle: "#"
                },
                3: {
                    category: "Frameworks",
                    title: "Optimización de Rendimiento en Aplicaciones React",
                    date: "1 Mayo, 2024",
                    author: "Carlos Rodríguez",
                    comments: "15 comentarios",
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    content: `<p>El rendimiento es un aspecto crítico de cualquier aplicación web moderna. En React, hay varias técnicas y mejores prácticas que pueden mejorar significativamente la velocidad y eficiencia de tu aplicación.</p>
                    
                    <h3>Memoización con useMemo y useCallback</h3>
                    <p>Estos hooks de React permiten evitar cálculos y recreaciones de funciones innecesarias. useMemo memoriza valores calculados, mientras que useCallback memoriza funciones, evitando renders innecesarios en componentes hijos.</p>
                    
                    <h3>Lazy Loading de Componentes</h3>
                    <p>React.lazy() y Suspense permiten cargar componentes solo cuando son necesarios, reduciendo el tamaño del bundle inicial y mejorando los tiempos de carga.</p>
                    
                    <h3>Virtualización de Listas</h3>
                    <p>Para listas largas, la virtualización renderiza solo los elementos visibles en pantalla, reduciendo significativamente el DOM y mejorando el rendimiento.</p>
                    
                    <h3>Herramientas de Profiling</h3>
                    <p>React DevTools incluye un profiler que permite identificar componentes que se renderizan demasiadas veces o consumen demasiado tiempo, facilitando la optimización.</p>
                    
                    <p>Implementar estas técnicas puede mejorar dramáticamente la experiencia de usuario, especialmente en dispositivos móviles o conexiones lentas.</p>`,
                    fullArticle: "#"
                },
                4: {
                    category: "JavaScript",
                    title: "Novedades de ES2024 para Desarrolladores",
                    date: "22 Abril, 2024",
                    author: "Ana López",
                    comments: "9 comentarios",
                    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    content: `<p>JavaScript sigue evolucionando y ES2024 trae nuevas características interesantes para los desarrolladores. En este artículo exploramos las novedades más relevantes.</p>
                    
                    <h3>Array.fromAsync()</h3>
                    <p>Esta nueva función estática permite crear arrays a partir de objetos iterables o array-like asíncronos, facilitando el trabajo con datos asíncronos.</p>
                    
                    <h3>RegExp v flag</h3>
                    <p>Una nueva bandera para expresiones regulares que permite un manejo más robusto de los sets de caracteres Unicode, especialmente útil para aplicaciones internacionales.</p>
                    
                    <h3>Mejoras en Temporal API</h3>
                    <p>Continuando con el trabajo en la Temporal API, ES2024 introduce mejoras para el manejo de fechas y horas, una de las áreas más problemáticas en JavaScript.</p>
                    
                    <p>Estas son solo algunas de las novedades que llegarán con ES2024. Mantenerse actualizado con las nuevas características del lenguaje es esencial para escribir código más eficiente y mantenible.</p>`,
                    fullArticle: "#"
                },
                5: {
                    category: "Backend",
                    title: "Construyendo APIs RESTful con Node.js y Express",
                    date: "24 Abril, 2024",
                    author: "Miguel Torres",
                    comments: "10 comentarios",
                    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
                    content: `<p>Node.js combinado con Express es una de las pilas más populares para construir APIs RESTful. En este artículo, exploramos las mejores prácticas y patrones para crear APIs robustas y escalables.</p>
                    
                    <h3>Estructura del Proyecto</h3>
                    <p>Una estructura organizada es fundamental para mantener el código limpio y escalable. Recomendamos separar rutas, controladores, modelos y middlewares en directorios distintos.</p>
                    
                    <h3>Manejo de Errores</h3>
                    <p>Implementar un middleware centralizado de manejo de errores permite procesar todos los errores de forma consistente y devolver respuestas apropiadas al cliente.</p>
                    
                    <h3>Validación de Datos</h3>
                    <p>Utilizar librerías como Joi o express-validator garantiza que los datos recibidos cumplan con los formatos esperados antes de procesarlos.</p>
                    
                    <h3>Autenticación y Autorización</h3>
                    <p>JWT (JSON Web Tokens) es una opción popular para autenticación sin estado. Es importante implementar correctamente la renovación de tokens y manejo de permisos.</p>
                    
                    <p>Siguiendo estas prácticas, puedes crear APIs que sean no solo funcionales, sino también mantenibles y escalables a medida que tu aplicación crece.</p>`,
                    fullArticle: "#"
                },
                6: {
                    category: "Ciencia de Datos",
                    title: "Introducción al Machine Learning para Desarrolladores",
                    date: "17 Abril, 2024",
                    author: "Ana López",
                    comments: "7 comentarios",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    content: `<p>El machine learning está transformando la forma en que desarrollamos software. En este artículo, introducimos los conceptos fundamentales que todo desarrollador debería conocer para empezar a trabajar con ML.</p>
                    
                    <h3>Tipos de Aprendizaje</h3>
                    <p>Existen tres tipos principales: aprendizaje supervisado (con datos etiquetados), no supervisado (sin etiquetas) y por refuerzo (basado en recompensas).</p>
                    
                    <h3>Algoritmos Comunes</h3>
                    <p>Regresión lineal, árboles de decisión, k-means clustering y redes neuronales son algunos de los algoritmos más utilizados, cada uno con sus casos de uso específicos.</p>
                    
                    <h3>Herramientas para Desarrolladores</h3>
                    <p>Python es el lenguaje más popular, con librerías como scikit-learn para algoritmos clásicos, TensorFlow y PyTorch para deep learning, y pandas para manipulación de datos.</p>
                    
                    <h3>Integración en Aplicaciones</h3>
                    <p>Los modelos entrenados pueden integrarse en aplicaciones web mediante APIs, bibliotecas como TensorFlow.js para el navegador, o servicios en la nube como AWS SageMaker.</p>
                    
                    <p>El machine learning ya no es exclusivo de científicos de datos. Los desarrolladores pueden y deben incorporar estas técnicas para crear aplicaciones más inteligentes y personalizadas.</p>`,
                    fullArticle: "#"
                }
            };
            
            articleLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const articleCard = this.closest('.post-card');
                    if (articleCard) {
                        const articleId = articleCard.getAttribute('data-article');
                        const article = articles[articleId];
                        
                        if (article) {
                            document.getElementById('modalCategory').textContent = article.category;
                            document.getElementById('modalTitle').textContent = article.title;
                            document.getElementById('modalDate').textContent = article.date;
                            document.getElementById('modalAuthor').textContent = article.author;
                            document.getElementById('modalComments').textContent = article.comments;
                            document.getElementById('modalImage').src = article.image;
                            document.getElementById('modalImage').alt = article.title;
                            document.getElementById('modalContent').innerHTML = article.content;
                            fullArticleLink.href = article.fullArticle;
                            
                            articleModal.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        }
                    }
                });
            });
            
            function closeModal() {
                articleModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            modalClose.addEventListener('click', closeModal);
            closeModalBtn.addEventListener('click', closeModal);
            
            articleModal.addEventListener('click', function(e) {
                if (e.target === articleModal) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && articleModal.classList.contains('active')) {
                    closeModal();
                }
            });
            
            const newsletterForm = document.querySelector('.newsletter-form');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('.newsletter-input').value;
                
                alert(`¡Gracias por suscribirte con el email: ${email}! Te hemos enviado un correo de confirmación.`);
                this.reset();
            });
        });
