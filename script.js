document.addEventListener('DOMContentLoaded', () => {
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            const { keywords, papers } = data;

            // Populate keywords for each category
            populateKeywords(keywords.journal, 'journal-column', 'journal', papers);
            populateKeywords(keywords.topic, 'topic-column', 'topic', papers);
            populateKeywords(keywords.method, 'method-column', 'method', papers);

            // Display all papers initially
            displayPapers(papers);
        });
});

function populateKeywords(keywords, columnId, category, papers) {
    const column = document.getElementById(columnId).querySelector('.keyword-container');
    keywords.forEach(keyword => {
        const keywordButton = document.createElement('div');
        keywordButton.classList.add('keyword');
        keywordButton.textContent = keyword;
        keywordButton.dataset.category = category;
        keywordButton.dataset.keyword = keyword;

        keywordButton.addEventListener('click', () => {
            displayPapers(papers, keyword, category);
        });

        column.appendChild(keywordButton);
    });
}

function displayPapers(papers, selectedKeyword = '', category = '') {
    const paperList = document.getElementById('paper-list');
    paperList.innerHTML = '';

    let filteredPapers = papers;
    if (selectedKeyword) {
        filteredPapers = papers.filter(paper =>
            paper.keywords[category]?.includes(selectedKeyword)
        );
    }

    filteredPapers.forEach((paper, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${paper.title}`;
        paperList.appendChild(li);
    });
}