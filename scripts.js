const dataUrl = 'papers.json'; // Path to your JSON file

async function loadData() {
    const response = await fetch(dataUrl);
    const data = await response.json();
    initializePage(data);
}

function initializePage(data) {
    const keywordContainer = document.getElementById('keywords');
    const paperList = document.getElementById('paper-list');
    
    const allKeywords = {
        journal: data.keywords.journal,
        topic: data.keywords.topic,
        method: data.keywords.method
    };

    // Populate keywords
    Object.keys(allKeywords).forEach(category => {
        allKeywords[category].forEach(keyword => {
            const button = document.createElement('button');
            button.textContent = keyword;
            button.className = 'keyword';
            button.dataset.category = category;
            button.dataset.keyword = keyword;
            button.addEventListener('click', () => filterPapers(data.papers, category, keyword));
            keywordContainer.appendChild(button);
        });
    });

    // Display all papers initially
    displayPapers(data.papers);

    function displayPapers(papers) {
        paperList.innerHTML = '';
        papers.forEach((paper, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${paper.title}`; // Add numbering
            paperList.appendChild(li);
        });
    }

    function filterPapers(papers, category, keyword) {
        const filteredPapers = papers.filter(paper => 
            paper.keywords[category].includes(keyword)
        );
        displayPapers(filteredPapers);
    }
}

// Load the data
loadData();
