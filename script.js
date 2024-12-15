// Load the JSON file
fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        setupFilters(data.keywords);
        displayPapers(data.papers);
    });

let activeFilters = {
    journal: [],
    topic: [],
    method: []
};

// Set up the filter buttons
function setupFilters(keywords) {
    const filterCategories = ['journal', 'topic', 'method'];

    filterCategories.forEach(category => {
        const container = document.getElementById(`${category}-buttons`);
        keywords[category].forEach(keyword => {
            const button = document.createElement('button');
            button.textContent = keyword;
            button.onclick = () => toggleFilter(category, keyword, button);
            container.appendChild(button);
        });
    });
}

// Toggle filter selection
function toggleFilter(category, keyword, button) {
    const index = activeFilters[category].indexOf(keyword);
    if (index === -1) {
        activeFilters[category].push(keyword);
        button.classList.add('active');
    } else {
        activeFilters[category].splice(index, 1);
        button.classList.remove('active');
    }
    filterPapers();
}

// Display papers
function displayPapers(papers) {
    const container = document.getElementById('papers-container');
    container.innerHTML = '';
    papers.forEach(paper => {
        const div = document.createElement('div');
        div.className = 'paper-item';
        div.innerHTML = `<h3>${paper.title}</h3>`;
        container.appendChild(div);
    });
}

// Filter papers
function filterPapers() {
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            const filteredPapers = data.papers.filter(paper => {
                return Object.keys(activeFilters).every(category => {
                    return activeFilters[category].length === 0 ||
                        activeFilters[category].some(keyword => paper.keywords[category].includes(keyword));
                });
            });
            displayPapers(filteredPapers);
        });
}
