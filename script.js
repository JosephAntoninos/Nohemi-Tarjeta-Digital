(function() {
    'use strict';

    const ACCOUNT_NUMBER = '638180000048723424';

    const copyBtn = document.getElementById('copyButton');
    const toast = document.getElementById('toast');
    const whatsappBtn = document.getElementById('whatsappShare');

    let toastTimer;

    // ---- Copiar al portapapeles ----
    function copyText(text, successMsg = '✅ Número copiado') {
        if (!navigator.clipboard) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast(successMsg);
            } catch (e) {
                showToast('❌ Error al copiar');
            }
            document.body.removeChild(textarea);
            return;
        }
        navigator.clipboard.writeText(text)
            .then(() => showToast(successMsg))
            .catch(() => showToast('❌ Error al copiar'));
    }

    // ---- Toast ----
    function showToast(msg) {
        clearTimeout(toastTimer);
        toast.textContent = msg;
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
    }

    // ---- Obtener URL actual ----
    function getCurrentUrl() {
        return window.location.href;
    }

    // ---- Construir URL de WhatsApp ----
    function buildWhatsAppUrl() {
        const url = getCurrentUrl();
        const message = `🔗 ${url}`;
        return `https://api.whatsapp.com/send?text=${message}`;
    }

    // ---- EVENTOS ----
    copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        copyText(ACCOUNT_NUMBER);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
    });

    // Solo queda el botón de WhatsApp
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(buildWhatsAppUrl(), '_blank');
    });

    // Inicializar href
    whatsappBtn.href = buildWhatsAppUrl();

    // Si cambia la URL (por si acaso)
    window.addEventListener('popstate', function() {
        whatsappBtn.href = buildWhatsAppUrl();
    });

    console.log('✅ Tarjeta Débito Digital lista');
})();
