document.addEventListener('DOMContentLoaded', () => {
    const keywordDataUrl = './papers.json'; // Path to JSON file
    const paperList = document.getElementById('paper-list');
    const journalFilters = document.getElementById('journal-filters');
    const topicFilters = document.getElementById('topic-filters');
    const methodFilters = document.getElementById('method-filters');

    let allPapers = [];

    // Fetch JSON data
    fetch(keywordDataUrl)
        .then(response => response.json())
        .then(data => {
            allPapers = data.papers;
            createFilters('journal', data.keywords.journal, journalFilters);
            createFilters('topic', data.keywords.topic, topicFilters);
            createFilters('method', data.keywords.method, methodFilters);
            renderPapers(allPapers);
        });

    // Create filters dynamically
    function createFilters(type, keywords, container) {
        keywords.forEach(keyword => {
            const li = document.createElement('li');
            li.textContent = keyword;
            li.dataset.type = type;
            li.dataset.keyword = keyword;
            li.addEventListener('click', () => filterPapers(type, keyword));
            container.appendChild(li);
        });
    }

    // Filter papers based on keyword
    function filterPapers(type, keyword) {
        const filteredPapers = allPapers.filter(paper =>
            paper.keywords[type]?.includes(keyword)
        );
        renderPapers(filteredPapers);
    }

    // Render papers list
    function renderPapers(papers) {
        paperList.innerHTML = '';
        papers.forEach((paper, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${paper.title}`;
            paperList.appendChild(li);
        });
    }
});
