document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch JSON data from papers.json
        const response = await fetch("papers.json");
        const data = await response.json();

        // Extract keywords and papers from JSON
        const { keywords, papers } = data;

        // Select keyword containers
        const substantiveKeywordsContainer = document.querySelector("#substantive-keywords ul");
        const methodologicalKeywordsContainer = document.querySelector("#methodological-keywords ul");

        // Select paper list container
        const paperList = document.getElementById("paper-list");

        // Function to populate keyword lists
        const populateKeywords = (keywordArray, container) => {
            keywordArray.forEach(keyword => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#" data-keyword="${keyword}">${keyword}</a>`;
                container.appendChild(li);
            });
        };

        // Populate Substantive and Methodological keywords
        populateKeywords(keywords.substantive, substantiveKeywordsContainer);
        populateKeywords(keywords.methodological, methodologicalKeywordsContainer);

        // Function to display papers based on selected keyword
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

        // Attach event listeners to keyword links
        document.querySelectorAll("#keywords a").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent default link behavior
                const keyword = e.target.getAttribute("data-keyword");

                // Highlight the selected keyword
                document.querySelectorAll("#keywords a").forEach(l => l.classList.remove("active"));
                e.target.classList.add("active");

                // Filter and display papers based on the selected keyword
                displayPapers(keyword);
            });
        });

        // Display all papers by default
        displayPapers();
        console.log("Keywords and papers successfully loaded!");
    } catch (error) {
        console.error("Error loading or processing JSON file:", error);
    }
});
