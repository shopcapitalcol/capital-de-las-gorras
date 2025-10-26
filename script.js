// Datos de productos (gorras)
const products = [
    { id: 1, name: "Gorra Snapback Classic", price: 45, description: "Estilo urbano con ajuste perfecto" },
    { id: 2, name: "Gorra Trucker Vintage", price: 38, description: "Look retro con malla transpirable" },
    { id: 3, name: "Gorra Dad Hat Minimal", price: 42, description: "Diseño minimalista y cómodo" },
    { id: 4, name: "Gorra Bucket Street", price: 50, description: "Tendencia streetwear auténtica" },
    { id: 5, name: "Gorra Baseball Premium", price: 55, description: "Calidad premium para uso diario" },
    { id: 6, name: "Gorra Beanie Urban", price: 35, description: "Perfecta para el clima frío" },
    { id: 7, name: "Gorra Fitted Pro", price: 60, description: "Ajuste perfecto estilo profesional" },
    { id: 8, name: "Gorra Visor Sport", price: 40, description: "Ideal para actividades deportivas" }
];

// Nuevas publicaciones (últimas 4 gorras)
const nuevasPublicaciones = [
    { id: 9, name: "Gorra Supreme Edition", price: 75, description: "Edición limitada exclusiva", isNew: true },
    { id: 10, name: "Gorra Neon Street", price: 48, description: "Colores vibrantes y modernos", isNew: true },
    { id: 11, name: "Gorra Retro Wave", price: 52, description: "Inspiración vintage renovada", isNew: true },
    { id: 12, name: "Gorra Tech Pro", price: 68, description: "Tecnología y estilo unidos", isNew: true }
];

// Productos clásicos
const productosClasicos = [
    { id: 13, name: "Gorra Classic Black", price: 90, description: "Negro clásico atemporal" },
    { id: 14, name: "Gorra White Essential", price: 90, description: "Blanco básico elegante" },
    { id: 15, name: "Gorra Navy Traditional", price: 95, description: "Azul marino tradicional" },
    { id: 16, name: "Gorra Gray Vintage", price: 60, description: "Gris vintage sofisticado" }
];

let selectedProduct = null;
let currentSection = 'inicio';

// Función para mostrar secciones
function showSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section-content').forEach(sec => {
        sec.classList.add('hidden');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(section + '-section').classList.remove('hidden');
    currentSection = section;
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-blue-600', 'font-bold');
        link.classList.add('text-gray-700');
    });
    
    // Cerrar menú móvil cuando se selecciona una opción
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('mobile-menu-btn');
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('show');
    hamburger.classList.remove('active');
    
    // Renderizar contenido según la sección
    if (section === 'inicio') {
        renderNuevasPublicaciones();
    } else if (section === 'gorras') {
        renderProducts();
    } else if (section === 'clasico') {
        renderProductosClasicos();
    }
}

// Renderizar card de producto
function renderProductCard(product, containerId = null) {
    const newBadge = product.isNew ? '<div class="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">¡NUEVO!</div>' : '';
    
    return `
        <div class="product-card rounded-2xl shadow-lg overflow-hidden cursor-pointer group relative" onclick="selectProduct(${product.id})">
            ${newBadge}
            <div class="p-6">
                <!-- Placeholder para imagen de gorra -->
                <div class="cap-placeholder h-48 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div class="text-center">
                        <i class="fas fa-hat-cowboy text-4xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-500 font-medium">Imagen de gorra</p>
                        <p class="text-xs text-gray-400">Próximamente</p>
                    </div>
                </div>
                
                <div class="text-center">
                    <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">${product.name}</h3>
                    <p class="text-gray-600 mb-4 text-sm leading-relaxed">${product.description}</p>
                    <div class="text-2xl font-black text-blue-600 mb-6">$${product.price}</div>
                    <button class="modern-btn w-full text-white py-3 px-6 rounded-xl font-bold text-sm shadow-lg">
                        <i class="fab fa-whatsapp mr-2"></i>¡La quiero! 🔥
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Renderizar nuevas publicaciones
function renderNuevasPublicaciones() {
    const grid = document.getElementById('nuevas-grid');
    grid.innerHTML = nuevasPublicaciones.map(product => renderProductCard(product)).join('');
}

// Renderizar productos
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => renderProductCard(product)).join('');
}

// Renderizar productos clásicos
function renderProductosClasicos() {
    const grid = document.getElementById('clasico-grid');
    grid.innerHTML = productosClasicos.map(product => renderProductCard(product)).join('');
}

// Seleccionar producto
function selectProduct(productId) {
    // Buscar en todas las colecciones
    selectedProduct = [...products, ...nuevasPublicaciones, ...productosClasicos].find(p => p.id === productId);
    showWhatsAppModal();
}

// Mostrar modal de WhatsApp
function showWhatsAppModal() {
    const modal = document.getElementById('whatsapp-modal');
    modal.classList.remove('hidden');
}

// Redirigir a WhatsApp
function redirectToWhatsApp() {
    const phoneNumber = "573225202441"; // Número sin espacios ni símbolos
    const message = selectedProduct 
        ? `¡Hola! Me interesa el producto: ${selectedProduct.name} - $${selectedProduct.price}. ¿Podrías darme más información?`
        : "¡Hola! Me interesan sus productos. ¿Podrían ayudarme?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Cerrar modal
    document.getElementById('whatsapp-modal').classList.add('hidden');
}

// Event listeners
document.getElementById('whatsapp-redirect').addEventListener('click', redirectToWhatsApp);
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('whatsapp-modal').classList.add('hidden');
});

// Menú móvil
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('mobile-menu-btn');
    
    // Toggle las clases
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
});

// Formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar mensaje de éxito
    document.getElementById('contact-success').classList.remove('hidden');
    this.reset();
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        document.getElementById('contact-success').classList.add('hidden');
    }, 5000);
});

// Cerrar modal al hacer clic fuera
document.getElementById('whatsapp-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');   
    }
});

// Animación de desvanecido para el texto en español
function fadeInSpanishText() {
    setTimeout(() => {
        const spanishText = document.getElementById('spanish-text');
        spanishText.classList.remove('opacity-0');
        spanishText.classList.add('opacity-100');
    }, 1500);
}

// Inicializar
showSection('inicio'); // Mostrar inicio por defecto
fadeInSpanishText();