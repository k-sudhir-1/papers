let papersData = {};

// Fetch data from papers.json
async function loadPapersData() {
    try {
        const response = await fetch("papers.json");
        papersData = await response.json();
        initFilters(); // Initialize the filters after loading data
    } catch (error) {
        console.error("Error loading papers data:", error);
    }
}

// Initialize buttons
function initFilters() {
    const journalFilters = document.getElementById("journal-filters");
    const topicFilters = document.getElementById("topic-filters");
    const methodFilters = document.getElementById("method-filters");

    papersData.keywords.journal.forEach(keyword => createButton(journalFilters, keyword, "journal"));
    papersData.keywords.topic.forEach(keyword => createButton(topicFilters, keyword, "topic"));
    papersData.keywords.method.forEach(keyword => createButton(methodFilters, keyword, "method"));
}

// Create individual buttons
function createButton(container, keyword, type) {
    const button = document.createElement("button");
    button.textContent = keyword;
    button.addEventListener("click", () => filterPapers(keyword, type));
    container.appendChild(button);
}

// Filter papers by keyword
function filterPapers(keyword, type) {
    const paperList = document.getElementById("paper-list");
    paperList.innerHTML = ""; // Clear previous results

    const filteredPapers = papersData.papers.filter(paper => paper.keywords[type].includes(keyword));
    filteredPapers.forEach(paper => {
        const listItem = document.createElement("li");
        listItem.textContent = paper.title;
        paperList.appendChild(listItem);
    });
}

// Load data and initialize the page
document.addEventListener("DOMContentLoaded", () => {
    loadPapersData(); // Load JSON and set up filters
});
