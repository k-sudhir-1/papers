
document.addEventListener("DOMContentLoaded", () => {
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            const papers = data.papers;
            const substantiveList = document.getElementById('substantive-list');
            const methodologicalList = document.getElementById('methodological-list');
            const paperList = document.getElementById('paper-list');

            const keywordMap = { substantive: new Set(), methodological: new Set() };

            papers.forEach(paper => {
                paper.substantive_keywords.forEach(keyword => keywordMap.substantive.add(keyword));
                paper.methodological_keywords.forEach(keyword => keywordMap.methodological.add(keyword));
            });

            const renderKeywords = (keywords, container, type) => {
                keywords.forEach(keyword => {
                    const li = document.createElement('li');
                    li.textContent = keyword;
                    li.addEventListener('click', () => filterPapers(type, keyword));
                    container.appendChild(li);
                });
            };

            renderKeywords(keywordMap.substantive, substantiveList, 'substantive');
            renderKeywords(keywordMap.methodological, methodologicalList, 'methodological');

            const renderPapers = (filteredPapers) => {
                paperList.innerHTML = '';
                filteredPapers.forEach(paper => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${paper.url}" target="_blank">${paper.title}</a>`;
                    paperList.appendChild(li);
                });
            };
            renderPapers(papers);

            const filterPapers = (type, keyword) => {
                const filtered = papers.filter(paper =>
                    paper[`${type}_keywords`].includes(keyword)
                );
                renderPapers(filtered);
            };
        });
});
