// Función para abrir/cerrar unidades en el sílabo
function toggleMenu(id) {
    const menu = document.getElementById(id);
    const btn = event.currentTarget; // Captura el botón que hizo clic
    
    // Cerrar otros submenús abiertos (opcional, para orden)
    document.querySelectorAll('.submenu').forEach(s => {
        if(s.id !== id) s.style.display = 'none';
    });

    // Abrir o cerrar el actual
    if (menu.style.display === "block") {
        menu.style.display = "none";
        btn.classList.remove("active-btn");
    } else {
        menu.style.display = "block";
        btn.classList.add("active-btn");
    }
}

// 🔽 SCROLL SPY CORREGIDO (Detecta secciones y bibliografía)
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar a, .menu-btn");
    
    let current = "";

    // Detectar si estamos al final de la página (para la Bibliografía)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = "bibliografia";
    } else {
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajuste de detección: 150px de margen para el header fijo
            if (pageYOffset >= sectionTop - 160) {
                current = section.getAttribute("id");
            }
        });
    }

    navLinks.forEach((link) => {
        link.classList.remove("active-link");
        link.classList.remove("active-btn");

        // Si es un link directo (a, bibliografía, etc)
        if (link.tagName === 'A' && link.getAttribute("href").includes(current)) {
            link.classList.add("active-link");
        }
        
        // Lógica especial para botones de Unidades (U1, U2...)
        // Si la sección actual es "unidad1", iluminamos el botón que abre ese menú
        if (current.startsWith("unidad")) {
            const unitNumber = current.replace("unidad", ""); // saca el 1, 2, 3...
            const targetBtn = document.querySelector(`[onclick="toggleMenu('u${unitNumber}')"]`);
            if (targetBtn) {
                targetBtn.classList.add("active-btn");
            }
        }
    });
});

// 🔽 SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const destino = document.querySelector(targetId);
        
        if (destino) {
            window.scrollTo({
                top: destino.offsetTop - 120, // Ajuste exacto para tu header fijo
                behavior: "smooth"
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // 1. Obtener la URL completa actual
    const currentUrl = window.location.href;
    
    // 2. Buscar todos los links del sidebar
    const links = document.querySelectorAll(".sidebar a");

    links.forEach(link => {
        // 3. Obtener la URL absoluta del enlace
        const linkUrl = link.href;

        // 4. Comparar si la URL actual contiene la del link
        // Esto funciona incluso si estás en carpetas locales
        if (currentUrl.includes(link.getAttribute("href"))) {
            link.classList.add("active-link");
        }
        
        // Caso especial para el Inicio (index.html) 
        // Si la URL termina en la carpeta raíz o en index.html
        if (currentUrl.endsWith('/') && link.getAttribute("href") === "index.html") {
            link.classList.add("active-link");
        }
    });
});