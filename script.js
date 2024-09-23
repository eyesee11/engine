document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const searchHistoryDiv = document.getElementById('search-history');

    loadSearchHistory();

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            saveSearch(query);
            displaySearchHistory();
        }
        searchInput.value = '';
    });

    clearHistoryButton.addEventListener('click', () => {
        localStorage.removeItem('searchHistory');
        displaySearchHistory();
    });

    function saveSearch(query) {
        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!history.includes(query)) {
            history.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(history));
        }
    }

    function loadSearchHistory() {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.forEach(item => addHistoryItem(item));
    }

    function displaySearchHistory() {
        searchHistoryDiv.innerHTML = '';
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.forEach(item => addHistoryItem(item));
    }

    function addHistoryItem(item) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item;
        searchHistoryDiv.appendChild(div);
    }
});