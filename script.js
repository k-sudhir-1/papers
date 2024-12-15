fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        const { keywords, papers } = data;
        setupKeywords(keywords);
        renderPapers(papers);
    });

function setupKeywords(keywords) {
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

function renderPapers(filteredPapers) {
    const list = document.getElementById('papers-list');
    list.innerHTML = '';
    filteredPapers.forEach((paper, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${paper.title}`;
        list.appendChild(listItem);
    });
}

function filterPapers(group, keyword) {
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.papers.filter(paper => paper.keywords[group]?.includes(keyword));
            renderPapers(filtered);
        });
}
