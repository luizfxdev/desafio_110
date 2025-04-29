/**
 * Função para restaurar as constelações perdidas
 * @param {string} starsString - String representando o mapa estelar
 * @returns {string} - String com as constelações restauradas em ordem alfabética
 */
function restoreConstellations(starsString) {
    // 1. Converter a string para um array de caracteres
    const starsArray = starsString.split('');

    // 2. Ordenar os caracteres em ordem alfabética
    const sortedArray = starsArray.sort((a, b) => a.localeCompare(b));

    // 3. Juntar o array ordenado de volta para uma string
    const restoredConstellations = sortedArray.join('');

    return restoredConstellations;
}

/**
 * Função para animar o resultado
 * @param {HTMLElement} element - Elemento HTML que exibirá o resultado
 * @param {string} result - Resultado final a ser exibido
 */
function animateResult(element, result) {
    // Limpar o conteúdo atual
    element.textContent = '';
    element.classList.remove('has-result');

    // Adicionar classe para estilização
    element.classList.add('has-result');

    // Animação de digitação
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < result.length) {
            element.textContent += result[i];
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 50);
}

// Aguardar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const inputElement = document.getElementById('constellation-input');
    const resultElement = document.getElementById('constellation-result');
    const restoreButton = document.querySelector('.js-animated-button');
    const returnButton = document.querySelector('.return-btn');

    // Evento de clique no botão Restaurar
    restoreButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Obter o valor do input
        const inputValue = inputElement.value.trim().toLowerCase();

        // Validar a entrada
        if (!inputValue) {
            resultElement.textContent = 'Por favor, insira um mapa estelar válido.';
            resultElement.classList.add('has-result');
            return;
        }

        // Processar e exibir o resultado
        const result = restoreConstellations(inputValue);
        animateResult(resultElement, result);
    });

    // Evento de clique no botão Retornar
    returnButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Limpar os campos
        inputElement.value = '';
        resultElement.textContent = '';
        resultElement.classList.remove('has-result');
        // Focar no input
        inputElement.focus();
    });

    // Evento de pressionar Enter no input
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            restoreButton.click();
        }
    });

    // Efeito de foco no input ao carregar a página
    inputElement.focus();
});