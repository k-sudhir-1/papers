document.addEventListener('DOMContentLoaded', () => {
  fetch('papers.json')
    .then(response => response.json())
    .then(data => {
      const papers = data.papers;
      const keywords = data.keywords;

      // Populate buttons for each category
      Object.keys(keywords).forEach(category => {
        const container = document.getElementById(`${category}-buttons`);
        keywords[category].forEach(keyword => {
          const button = document.createElement('button');
          button.textContent = keyword;
          button.addEventListener('click', () => filterPapers(category, keyword));
          container.appendChild(button);
        });
      });

      // Display all papers initially
      displayPapers(papers);

      function filterPapers(category, keyword) {
        const filteredPapers = papers.filter(paper =>
          paper.keywords[category].includes(keyword)
        );
        displayPapers(filteredPapers);
      }

      function displayPapers(papers) {
        const papersList = document.getElementById('papers-list');
        papersList.innerHTML = '';
        papers.forEach((paper, index) => {
          const paperItem = document.createElement('div');
          paperItem.className = 'paper-item';
          const title = document.createElement('h3');
          title.textContent = `${index + 1}. ${paper.title}`;
          paperItem.appendChild(title);
          papersList.appendChild(paperItem);
        });
      }
    });
});
