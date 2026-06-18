/**
* ============================================
* TARJETA DÉBITO DIGITAL - JAVASCRIPT
* Funcionalidades: Copiar, compartir, notificaciones
* ============================================
*/

(function() {
// ==========================================
// CONFIGURACIÓN
// ==========================================
const ACCOUNT_NUMBER = '638180000048723424';

// ==========================================
// ELEMENTOS DOM
// ==========================================
const copyBtn = document.getElementById('copyButton');
const toast = document.getElementById('toast');
const copyLinkBtn = document.getElementById('copyLinkButton');
const whatsappBtn = document.getElementById('whatsappShare');

// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

/**
* Copia texto al portapapeles (con fallback para navegadores antiguos)
* @param {string} text - Texto a copiar
* @param {string} successMessage - Mensaje de éxito
*/
function copyText(text, successMessage = '✅ Número copiado') {
// Fallback para navegadores antiguos
if (!navigator.clipboard) {
const textarea = document.createElement('textarea');
textarea.value = text;
document.body.appendChild(textarea);
textarea.select();
try {
document.execCommand('copy');
showToast(successMessage);
} catch (e) {
showToast('❌ Error al copiar');
}
document.body.removeChild(textarea);
return;
}

// Método moderno (Clipboard API)
navigator.clipboard.writeText(text)
.then(() => {
showToast(successMessage);
})
.catch(() => {
showToast('❌ Error al copiar');
});
}

/**
* Muestra una notificación tipo toast
* @param {string} msg - Mensaje a mostrar
*/
function showToast(msg) {
toast.textContent = msg;
toast.classList.add('show');

// Limpiar timer anterior
clearTimeout(toast._hideTimer);

// Ocultar después de 2.4 segundos
toast._hideTimer = setTimeout(() => {
toast.classList.remove('show');
}, 2400);
}

/**
* Obtiene la URL completa de la página actual
* @returns {string} URL completa
*/
function getCurrentUrl() {
return window.location.href;
}

/**
* Construye la URL para compartir por WhatsApp
* @returns {string} URL de WhatsApp
*/
function buildWhatsAppUrl() {
const url = getCurrentUrl();
const message = `💳 *Tarjeta de débito*%0A📋 Número: ${ACCOUNT_NUMBER}%0A🔗 ${url}`;
return `https://api.whatsapp.com/send?text=${message}`;
}

// ==========================================
// EVENTOS
// ==========================================

/**
* EVENTO: Copiar número de cuenta
*/
copyBtn.addEventListener('click', function(e) {
e.preventDefault();
copyText(ACCOUNT_NUMBER, '✅ Número copiado');

// Feedback visual del botón
copyBtn.classList.add('copied');
setTimeout(() => copyBtn.classList.remove('copied'), 1800);
});

/**
* EVENTO: Copiar link de la página
*/
copyLinkBtn.addEventListener('click', function(e) {
e.preventDefault();
const url = getCurrentUrl();
copyText(url, '✅ Link copiado');

// Feedback visual
copyLinkBtn.style.backgroundColor = '#a0a4ab';
copyLinkBtn.style.color = '#3e0c11';
copyLinkBtn.style.borderColor = '#d29ea4';
setTimeout(() => {
copyLinkBtn.style.backgroundColor = '';
copyLinkBtn.style.color = '';
copyLinkBtn.style.borderColor = '';
}, 1800);
});

/**
* EVENTO: Compartir por WhatsApp
*/
whatsappBtn.addEventListener('click', function(e) {
e.preventDefault();
const whatsappUrl = buildWhatsAppUrl();
window.open(whatsappUrl, '_blank');
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

/**
* Actualiza el href del botón de WhatsApp
* (por si se usa de otra forma o se actualiza la URL)
*/
whatsappBtn.href = buildWhatsAppUrl();

/**
* Si la URL cambia (SPA), actualiza el enlace de WhatsApp
*/
window.addEventListener('popstate', function() {
whatsappBtn.href = buildWhatsAppUrl();
});

console.log('✅ Tarjeta Débito Digital inicializada correctamente');
console.log(`📋 Número de cuenta: ${ACCOUNT_NUMBER}`);

})();
