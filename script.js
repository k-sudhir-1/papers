document.addEventListener("DOMContentLoaded", () => {
    const papers = [
        { title: "Paper 1 on Privacy", keywords: ["privacy", "GDPR"] },
        { title: "Paper 2 on AI and Economics", keywords: ["AI", "economics"] },
        { title: "Paper 3 on Data Regulation", keywords: ["GDPR", "economics"] }
    ];

    const paperList = document.getElementById("paper-list");
    const keywordLinks = document.querySelectorAll("#keywords a");

    // Function to display papers
    const displayPapers = (filterKeyword = null) => {
        paperList.innerHTML = ""; // Clear the list
        const filteredPapers = filterKeyword
            ? papers.filter(paper => paper.keywords.includes(filterKeyword))
            : papers;

        filteredPapers.forEach(paper => {
            const li = document.createElement("li");
            li.textContent = paper.title;
            paperList.appendChild(li);
        });
    };

    // Attach event listeners to keyword links
    keywordLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const keyword = e.target.getAttribute("data-keyword");
            displayPapers(keyword);
        });
    });

    // Display all papers by default
    displayPapers();
});
