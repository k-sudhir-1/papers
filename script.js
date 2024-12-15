document.addEventListener('DOMContentLoaded', () => {
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            const keywords = data.keywords;

            // Populate the keywords in each column
            populateKeywords(keywords.journal, 'journal-column');
            populateKeywords(keywords.topic, 'topic-column');
            populateKeywords(keywords.method, 'method-column');
        });
});

function populateKeywords(keywords, columnId) {
    const column = document.getElementById(columnId).querySelector('.keyword-container');
    keywords.forEach(keyword => {
        const keywordButton = document.createElement('div');
        keywordButton.classList.add('keyword');
        keywordButton.textContent = keyword;
        column.appendChild(keywordButton);
    });
}