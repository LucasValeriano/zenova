/**
 * CONFIGURAÇÃO GLOBAL DE LINKS E TRACKING
 * 
 * Centralize aqui os links do seu novo checkout e scripts de rastreamento.
 */

const CONFIG = {
    // LINKS DO SEU CHECKOUT
    // Você pode usar URLs diferentes para cada plano se desejar.
    CHECKOUT_BASICO_URL: 'https://compraseguraonline.org.ua/c/427706ce53', // Link do plano básico (47)
    CHECKOUT_COMPLETO_URL: 'https://compraseguraonline.org.ua/c/e2b6830746', // Link do plano completo (67)
    CHECKOUT_UPSELL_URL: 'https://compraseguraonline.org.ua/c/4bb78d4d7e', // Link do pop-up upsell (54,90)
    
    // LINK DA PÁGINA DE VENDAS
    // Usado pelo Advertorial para levar o usuário à oferta.
    SALES_PAGE_URL: '/descobrindo-o-porque-da-fe/',

    /**
     * Função para inicializar seus novos pixels e scripts de rastreamento.
     * Cole seus códigos (Facebook Pixel, Google Tag Manager, etc.) dentro desta função.
     */
    initPixels: function() {
        console.log("Config: Inicializando scripts de rastreamento personalizados...");
        
        // --- UTMify ---
        // window.pixelId = "69ab8e0c5a8ba22cf76e7080";
        // var a = document.createElement("script");
        // a.setAttribute("async", "");
        // a.setAttribute("defer", "");
        // a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
        // document.head.appendChild(a);

        // --- Meta Pixel ---
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        if (typeof window.fbq === 'function') {
            window.fbq('init', '26069232519364368');
            window.fbq('track', 'PageView');

            // Trackeamento específico detectando os elementos presentes na tela
            // (Isso corrige falhas caso você esteja acessando via Live Server onde a URL muda)
            if (document.querySelector('.btn-sales-page')) {
                // Se encontrou botão para a Sales Page, estamos no Advertorial
                window.fbq('trackCustom', 'Advertorial');
                console.log("Trackeando Pixel Especial: Advertorial");
            } else if (document.querySelector('.btn-checkout-basico') || document.querySelector('.btn-checkout-completo')) {
                // Se existe botão de checkout, estamos na Página de Vendas
                window.fbq('trackCustom', 'PaginaDeVendas');
                console.log("Trackeando Pixel Especial: PaginaDeVendas");
            }
        }
    }
};

function injectPopup() {
    // Só injeta o HTML se existir o botão do plano básico na página
    if(!document.querySelector('.btn-checkout-basico')) return;

    const popupHTML = `
    <style>
        .upsell-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);
            display: flex; justify-content: center; align-items: center;
            z-index: 999999; opacity: 0; visibility: hidden; transition: opacity 0.3s ease;
            font-family: var(--e-global-typography-primary-font-family), "Manrope", sans-serif;
        }
        .upsell-overlay.active { opacity: 1; visibility: visible; }
        .upsell-modal {
            background: #ffffff; padding: 40px; border-radius: 20px; width: 92%; max-width: 480px;
            text-align: center; position: relative; transform: translateY(20px); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 25px 50px rgba(0,0,0,0.5); border-top: 5px solid #0693e3; 
        }
        .upsell-overlay.active .upsell-modal { transform: translateY(0); }
        .upsell-close {
            position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #999;
            transition: color 0.2s; font-weight: normal; line-height: 1;
        }
        .upsell-close:hover { color: #333; }
        .upsell-title { font-size: 26px; font-weight: 800; color: #cf2e2e; margin-bottom: 12px; line-height: 1.2; text-transform: uppercase; }
        .upsell-text { font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6; font-weight: 500; }
        .upsell-price { font-size: 36px; font-weight: 900; color: #00d084; margin-bottom: 25px; letter-spacing: -1px; }
        .upsell-btn {
            background-color: #00d084; color: #ffffff !important; text-decoration: none;
            padding: 18px 20px; border-radius: 10px; font-size: 18px; font-weight: 800; display: block;
            box-shadow: 0 4px 15px rgba(0,208,132,0.4); transition: all 0.3s ease; cursor: pointer;
            text-transform: uppercase; animation: upsell-pulse 2s infinite ease-in-out;
        }
        .upsell-btn:hover { background-color: #00b371; box-shadow: 0 6px 20px rgba(0,208,132,0.6); transform: scale(1.02); }
        @keyframes upsell-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.04); } 100% { transform: scale(1); } }
        .upsell-decline {
            display: inline-block; margin-top: 25px; font-size: 14px; color: #888; text-decoration: none; cursor: pointer;
            font-weight: 600; border-bottom: 1px dashed #ccc; padding-bottom: 2px;
        }
        .upsell-decline:hover { color: #444; border-bottom: 1px dashed #444; }
    </style>
    <div class="upsell-overlay" id="upsellOverlay">
        <div class="upsell-modal">
            <span class="upsell-close" id="upsellClose">&times;</span>
            <div class="upsell-title">ESPERE! 🛑<br>Oferta Única</div>
            <div class="upsell-text">Não leve apenas o básico. Destrave <strong style="color:#0693e3;">TODOS OS BÔNUS</strong> e a jornada completa de 52 semanas com um super desconto exclusivo!</div>
            <div class="upsell-price">R$ 17,00</div>
            <a href="${CONFIG.CHECKOUT_UPSELL_URL}" class="upsell-btn">QUERO O PLANO COMPLETO AGORA!</a>
            <a href="${CONFIG.CHECKOUT_BASICO_URL}" class="upsell-decline">Não, obrigado. Quero apenas o básico por R$ 10.</a>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    document.getElementById('upsellClose').addEventListener('click', () => {
        document.getElementById('upsellOverlay').classList.remove('active');
    });
}

function showUpsellPopup() {
    const overlay = document.getElementById('upsellOverlay');
    if(overlay) overlay.classList.add('active');
}

/**
 * Lógica para aplicar os links automaticamente aos botões.
 * Esta função procura por elementos com as classes específicas e atualiza o 'href'.
 */
function applyRedirects() {
    // Aplica a lógica do Upsell no botão do Plano Básico
    document.querySelectorAll('.btn-checkout-basico').forEach(el => {
        el.href = "javascript:void(0);"; // Desativa o link direto
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = document.getElementById('upsellOverlay');
            if (overlay) {
                showUpsellPopup();
                if(typeof window.fbq === 'function') window.fbq('trackCustom', 'OpenUpsellPopup'); // Evento opcional para tracking
            } else {
                window.location.href = CONFIG.CHECKOUT_BASICO_URL; // Fallback
            }
        });
    });

    // Aplica para o Plano Completo
    document.querySelectorAll('.btn-checkout-completo').forEach(el => {
        el.href = CONFIG.CHECKOUT_COMPLETO_URL;
    });

    // Aplica para o Advertorial (link para a Sales Page)
    document.querySelectorAll('.btn-sales-page').forEach(el => {
        el.href = CONFIG.SALES_PAGE_URL;
    });
}

function initConfigAndFunnels() {
    applyRedirects();
    CONFIG.initPixels();
    injectPopup(); // Injeta o HTML do Pop-up na inicialização
}

// Inicializa garantindo que funcione mesmo se o script for carregado no final do body
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfigAndFunnels);
} else {
    initConfigAndFunnels();
}
