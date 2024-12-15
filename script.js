document.addEventListener('DOMContentLoaded', () => {
    const keywordDataUrl = './papers.json'; // Path to JSON file
    const paperList = document.getElementById('paper-list');
    const keywordButtons = document.getElementById('keyword-buttons');

    let allPapers = [];
    let allKeywords = new Set();

    // Fetch JSON data
    fetch(keywordDataUrl)
        .then(response => response.json())
        .then(data => {
            allPapers = data.papers;
            extractKeywords(data.keywords);
            renderPapers(allPapers);
        });

    // Extract and render all unique keywords
    function extractKeywords(keywords) {
        Object.values(keywords).forEach(keywordList => {
            keywordList.forEach(keyword => allKeywords.add(keyword));
        });
        renderKeywordButtons([...allKeywords]);
    }

    // Render keyword buttons
    function renderKeywordButtons(keywords) {
        keywords.forEach(keyword => {
            const button = document.createElement('button');
            button.textContent = keyword;
            button.addEventListener('click', () => filterPapersByKeyword(keyword));
            keywordButtons.appendChild(button);
        });
    }

    // Filter papers by selected keyword
    function filterPapersByKeyword(keyword) {
        const filteredPapers = allPapers.filter(paper => {
            return (
                paper.keywords.journal?.includes(keyword) ||
                paper.keywords.topic?.includes(keyword) ||
                paper.keywords.method?.includes(keyword)
            );
        });
        renderPapers(filteredPapers);
    }

    // Render papers list
    function renderPapers(papers) {
        paperList.innerHTML = '';
        if (papers.length === 0) {
            paperList.innerHTML = '<li>No matching papers found.</li>';
            return;
        }
        papers.forEach((paper, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${paper.title}`;
            paperList.appendChild(li);
        });
    }
});