(function() {
    'use strict';

    const ACCOUNT_NUMBER = '638 180 000 048 723 424';

    const copyBtn = document.getElementById('copyButton');
    const toast = document.getElementById('toast');
    const copyLinkBtn = document.getElementById('copyLinkButton');
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
        const message = `💳 *Tarjeta de débito*%0A📋 Número: ${ACCOUNT_NUMBER}%0A🔗 ${url}`;
        return `https://api.whatsapp.com/send?text=${message}`;
    }

    // ---- EVENTOS ----
    copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        copyText(ACCOUNT_NUMBER);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
    });

    copyLinkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = getCurrentUrl();
        copyText(url, '✅ Link copiado');
        copyLinkBtn.style.backgroundColor = '#a0a4ab';
        copyLinkBtn.style.color = '#3e0c11';
        copyLinkBtn.style.borderColor = '#d29ea4';
        setTimeout(() => {
            copyLinkBtn.style.backgroundColor = '';
            copyLinkBtn.style.color = '';
            copyLinkBtn.style.borderColor = '';
        }, 1800);
    });

    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(buildWhatsAppUrl(), '_blank');
    });

    // Inicializar href
    whatsappBtn.href = buildWhatsAppUrl();

    // Si cambia la URL (SPA)
    window.addEventListener('popstate', function() {
        whatsappBtn.href = buildWhatsAppUrl();
    });

    console.log('✅ Tarjeta Débito Digital lista');
})();
