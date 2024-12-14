document.addEventListener('DOMContentLoaded', () => {
  fetch('papers.json')
    .then(response => response.json())
    .then(data => {
      const papers = data.papers;
      const keywords = {
        industry: new Set(),
        substantive: new Set(),
        methodological: new Set()
      };

      // Extract keywords
      papers.forEach(paper => {
        Object.keys(paper.keywords).forEach(category => {
          paper.keywords[category].forEach(keyword => {
            keywords[category].add(keyword);
          });
        });
      });

      // Populate keyword lists
      Object.keys(keywords).forEach(category => {
        const ul = document.getElementById(`${category}-keywords`);
        keywords[category].forEach(keyword => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#';
          a.textContent = keyword;
          a.addEventListener('click', () => filterPapers(category, keyword));
          li.appendChild(a);
          ul.appendChild(li);
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
        papers.forEach(paper => {
          const paperItem = document.createElement('div');
          paperItem.className = 'paper-item';
          const title = document.createElement('h3');
          title.textContent = paper.title;
          const authors = document.createElement('p');
          authors.textContent = `Authors: ${paper.authors.join(', ')}`;
          const journal = document.createElement('p');
          journal.textContent = `Journal: ${paper.journal}`;
          const status = document.createElement('p');
          status.textContent = `Status: ${paper.status}`;
          paperItem.appendChild(title);
          paperItem.appendChild(authors);
          paperItem.appendChild(journal);
          paperItem.appendChild(status);
          papersList.appendChild(paperItem);
        });
      }
    });
});