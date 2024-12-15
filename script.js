// Fetch data from the JSON file
fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        const { keywords, papers } = data;
        setupKeywords(keywords);
        renderPapers(papers);
    });

// Setup keyword buttons
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

// Render filtered papers
function renderPapers(filteredPapers) {
    const list = document.getElementById('papers-list');
    list.innerHTML = '';
    filteredPapers.forEach((paper, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${paper.title}`;
        list.appendChild(listItem);
    });
}

// Filter papers based on keyword selection
function filterPapers(group, keyword) {
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.papers.filter(paper => paper.keywords[group]?.includes(keyword));
            renderPapers(filtered);
        });
}
