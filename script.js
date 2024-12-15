
let papers = [];

// Load the JSON file dynamically
fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        papers = data.papers;
        setupFilters(data.keywords);
        displayPapers(papers);
    });

function setupFilters(keywords) {
    setupFilterButtons(keywords.journal, 'journal-filters');
    setupFilterButtons(keywords.topic, 'topic-filters');
    setupFilterButtons(keywords.method, 'method-filters');
}

function setupFilterButtons(filters, containerId) {
    const container = document.getElementById(containerId);
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        button.onclick = () => filterPapers(filter);
        container.appendChild(button);
    });
}

function filterPapers(keyword) {
    const filteredPapers = papers.filter(paper => {
        return Object.values(paper.keywords).some(keywordArray =>
            keywordArray.includes(keyword)
        );
    });
    displayPapers(filteredPapers);
}

function displayPapers(filteredPapers) {
    const container = document.getElementById('papers-container');
    container.innerHTML = ''; // Clear the container
    filteredPapers.forEach(paper => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${paper.title}</h3>`;
        container.appendChild(card);
    });
}
