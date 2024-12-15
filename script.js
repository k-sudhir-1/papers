document.addEventListener('DOMContentLoaded', () => {
    const keywordDataUrl = './papers.json'; // Path to the JSON file
    const journalFilters = document.getElementById('journal-filters');
    const topicFilters = document.getElementById('topic-filters');
    const methodFilters = document.getElementById('method-filters');
    const paperList = document.getElementById('paper-list');

    let allPapers = [];

    // Fetch JSON data
    fetch(keywordDataUrl)
        .then(response => response.json())
        .then(data => {
            allPapers = data.papers;
            createFilters(data.keywords.journal, journalFilters, 'journal');
            createFilters(data.keywords.topic, topicFilters, 'topic');
            createFilters(data.keywords.method, methodFilters, 'method');
        });

    // Create filters dynamically
    function createFilters(keywords, container, type) {
        keywords.forEach(keyword => {
            const button = document.createElement('button');
            button.textContent = keyword;
            button.addEventListener('click', () => filterPapers(type, keyword));
            container.appendChild(button);
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
        if (papers.length === 0) {
            paperList.innerHTML = '<li>No papers found for the selected keyword.</li>';
            return;
        }
        papers.forEach((paper, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${paper.title}`;
            paperList.appendChild(li);
        });
    }
});