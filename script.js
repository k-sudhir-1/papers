document.addEventListener("DOMContentLoaded", async () => {
    // Load data from JSON
    const response = await fetch("data.json");
    const data = await response.json();

    // Extract data
    const { keywords, papers } = data;

    const paperList = document.getElementById("paper-list");
    const substantiveKeywords = document.querySelector("#substantive-keywords ul");
    const methodologicalKeywords = document.querySelector("#methodological-keywords ul");

    // Populate Keywords
    const populateKeywords = (keywordArray, container) => {
        keywordArray.forEach(keyword => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="#" data-keyword="${keyword}">${keyword}</a>`;
            container.appendChild(li);
        });
    };

    populateKeywords(keywords.substantive, substantiveKeywords);
    populateKeywords(keywords.methodological, methodologicalKeywords);

    // Display Papers
    const displayPapers = (filterKeyword = null) => {
        paperList.innerHTML = ""; // Clear the list
        const filteredPapers = filterKeyword
            ? papers.filter(paper => paper.keywords.includes(filterKeyword))
            : papers;

        if (filteredPapers.length === 0) {
            paperList.innerHTML = "<li>No papers found for this keyword.</li>";
        } else {
            filteredPapers.forEach(paper => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${paper.link}" target="_blank">${paper.title}</a>`;
                paperList.appendChild(li);
            });
        }
    };

    // Attach Event Listeners to Keywords
    document.querySelectorAll("#keywords a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll("#keywords a").forEach(l => l.classList.remove("active"));
            e.target.classList.add("active");
            const keyword = e.target.getAttribute("data-keyword");
            displayPapers(keyword);
        });
    });

    // Display all papers by default
    displayPapers();
});
