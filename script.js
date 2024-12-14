document.addEventListener("DOMContentLoaded", () => {
    const papers = [
        {
            title: "Big Data and Marketing Analytics in Digital, Mobile, and Social Media",
            link: "https://faculty.som.yale.edu/ksudhir/papers/big-data-and-marketing-analytics",
            keywords: ["digital-marketing", "advertising"]
        },
        {
            title: "A Structural Model of Sponsored Search Advertising",
            link: "https://faculty.som.yale.edu/ksudhir/papers/structural-model-sponsored-search",
            keywords: ["advertising", "structural-models"]
        },
        {
            title: "Consumer Search and Choice Under Limited Attention",
            link: "https://faculty.som.yale.edu/ksudhir/papers/consumer-search-choice",
            keywords: ["consumer-behavior", "game-theory"]
        },
        {
            title: "Estimating Dynamic Models of Consumer Demand for Durable Goods",
            link: "https://faculty.som.yale.edu/ksudhir/papers/dynamic-models-demand",
            keywords: ["structural-models", "consumer-behavior"]
        },
        {
            title: "Marketing in Emerging Economies: A Review of the Literature",
            link: "https://faculty.som.yale.edu/ksudhir/papers/marketing-emerging-economies",
            keywords: ["emerging-markets"]
        }
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
            li.innerHTML = `<a href="${paper.link}" target="_blank">${paper.title}</a>`;
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
