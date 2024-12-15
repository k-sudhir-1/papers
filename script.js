const keywords = {};  // Load this dynamically from papers.json
const papers = [];    // Load this dynamically from papers.json

// Dynamically load keywords and papers from the JSON file
fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        keywords.journal = data.keywords.journal;
        keywords.topic = data.keywords.topic;
        keywords.method = data.keywords.method;
        papers.push(...data.papers);

        renderKeywords();
        renderPapers(papers);
    });

function renderKeywords() {
    ['journal', 'topic', 'method'].forEach(group => {
        const container = document.getElementById(`${group}-keywords`);
        keywords[group].forEach(keyword => {
            const keywordElement = document.createElement('div');
            keywordElement.textContent = keyword;
            keywordElement.addEventListener('click', () => filterPapers(group, keyword));
            container.appendChild(keywordElement);
        });
    });
}

function filterPapers(group, keyword) {
    const filtered = papers.filter(paper => paper.keywords[group]?.includes(keyword));
    renderPapers(filtered);
}

function renderPapers(filteredPapers) {
    const list = document.getElementById('papers-list');
    list.innerHTML = '';
    filteredPapers.forEach((paper, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${paper.title}`;
        list.appendChild(listItem);
    });
}
