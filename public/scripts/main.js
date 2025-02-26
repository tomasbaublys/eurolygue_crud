import MatchCard from "./MatchCard.js";
(() => {
    fetch(`http://localhost:8080/eurolyga`)
        .then(res => res.json())
        .then((matches) => {
        const matchesContainer = document.querySelector('#matchesContainer');
        matches.forEach(match => {
            const matchDiv = new MatchCard(match).render();
            matchesContainer.append(matchDiv);
        });
    });
})();
