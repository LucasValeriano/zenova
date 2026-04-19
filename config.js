/**
 * CONFIGURAÇÃO GLOBAL DE LINKS E TRACKING
 * 
 * Centralize aqui os links do seu novo checkout e scripts de rastreamento.
 */

const CONFIG = {
    // LINKS DO SEU CHECKOUT
    // Você pode usar URLs diferentes para cada plano se desejar.
    CHECKOUT_BASICO_URL: 'https://pay.hotmart.com/H104318054N?checkoutMode=10', // Troque pelo seu link
    CHECKOUT_COMPLETO_URL: 'https://pay.hotmart.com/I104318317A?checkoutMode=10', // Troque pelo seu link
    
    // LINK DA PÁGINA DE VENDAS
    // Usado pelo Advertorial para levar o usuário à oferta.
    SALES_PAGE_URL: '../../../zenova%202/zenovaadigital.shop/descobrindo-o-porque-da-fe/index.html',

    /**
     * Função para inicializar seus novos pixels e scripts de rastreamento.
     * Cole seus códigos (Facebook Pixel, Google Tag Manager, etc.) dentro desta função.
     */
    initPixels: function() {
        console.log("Config: Inicializando scripts de rastreamento personalizados...");
        
        // --- COLE SEUS CÓDIGOS DE PIXEL ABAIXO ---
        
        /* Exemplo:
        !function(f,b,e,v,n,t,s){...}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'SEU_PIXEL_AQUI');
        fbq('track', 'PageView');
        */
        
        // --- FINAL DO ESPAÇO PARA PIXELS ---
    }
};

/**
 * Lógica para aplicar os links automaticamente aos botões.
 * Esta função procura por elementos com as classes específicas e atualiza o 'href'.
 */
function applyRedirects() {
    // Aplica para o Plano Básico
    document.querySelectorAll('.btn-checkout-basico').forEach(el => {
        el.href = CONFIG.CHECKOUT_BASICO_URL;
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

// Inicializa tudo quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    applyRedirects();
    CONFIG.initPixels();
});
