(function() {
    'use strict';

    const ACCOUNT_NUMBER = '638180000048723424';

    const copyBtn = document.getElementById('copyButton');
    const toast = document.getElementById('toast');
    const copyLinkBtn = document.getElementById('copyLinkButton');
    const whatsappBtn = document.getElementById('whatsappShare');

    let toastTimer;

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

    function showToast(msg) {
        clearTimeout(toastTimer);
        toast.textContent = msg;
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
    }

    function getCurrentUrl() {
        return window.location.href;
    }

    function buildWhatsAppUrl() {
        const url = getCurrentUrl();
        const message = `💳 *Tarjeta de débito digital*%0ACon un solo clic puedes copiar el número de cuenta. Mírala aquí:%0A${url}`;
        return `https://api.whatsapp.com/send?text=${message}`;
    }

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

    whatsappBtn.href = buildWhatsAppUrl();

    window.addEventListener('popstate', function() {
        whatsappBtn.href = buildWhatsAppUrl();
    });

    console.log('✅ Tarjeta Débito Digital lista');
})();
