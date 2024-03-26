// Variáveis
const totalPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Total de páginas
let currentRange = [1, 2, 3, 4, 5]; // Controle dos botões de página exibidos
let currentPage = 1; // Página atual

// Elementos DOM
const screenPage = document.querySelector('#pag');
const displayButtons = document.querySelector('#btns');
const nextButton = document.querySelector('#next');
const backButton = document.querySelector('#back');

// Função para desabilitar o botão "Anterior"
const disableBackButton = () => {
    if (currentRange[0] !== 1) {
        backButton.removeAttribute('disabled');
    } else {
        backButton.setAttribute('disabled', '');
    }
};

// Função para desabilitar o botão "Próximo"
const disableNextButton = () => {
    if (totalPages[totalPages.length - 1] !== currentRange[currentRange.length - 1]) {
        nextButton.removeAttribute('disabled');
    } else {
        nextButton.setAttribute('disabled', '');
    }
};

// Função para imprimir a página na tela
const handleClick = (e) => {
    const id = e.target;
    screenPage.textContent = id.textContent;

    if (id.textContent == currentRange[currentRange.length - 1]) {
        nextPage();
    } else if (id.textContent == currentRange[0]) {
        previousPage();
    }
};

// Função para avançar para a próxima página
const nextPage = () => {
    if (currentRange[currentRange.length - 1] == totalPages[totalPages.length - 1]) {
        return;
    }
    currentRange.push(currentRange[currentRange.length - 1] + 1);
    currentRange.shift();
    updateButtons();
    disableBackButton();
    disableNextButton();
};

// Função para voltar para a página anterior
const previousPage = () => {
    if (currentRange[0] == 1) {
        return;
    }
    currentRange.unshift(currentRange[0] - 1);
    currentRange.pop();
    updateButtons();
    disableBackButton();
    disableNextButton();
};

// Função para atualizar os botões de página exibidos
const updateButtons = () => {
    displayButtons.innerHTML = '';
    currentRange.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn;
        button.addEventListener('click', handleClick);
        displayButtons.appendChild(button);
    });
};

// Inicialização
updateButtons();
screenPage.textContent = currentRange[0];

// Event Listeners
nextButton.addEventListener('click', nextPage);
backButton.addEventListener('click', previousPage);
