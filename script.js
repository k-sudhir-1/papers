document.addEventListener('DOMContentLoaded', () => {
    fetch('papers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Keywords:', data.keywords); // Debugging line
            const keywords = data.keywords;

            populateKeywords(keywords.journal, 'journal-column');
            populateKeywords(keywords.topic, 'topic-column');
            populateKeywords(keywords.method, 'method-column');
        })
        .catch(error => {
            console.error('Error loading JSON:', error); // Log errors for debugging
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