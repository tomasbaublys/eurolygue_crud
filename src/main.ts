import MatchCard from "./MatchCard.js"
import { Match } from "./types.js";

((): void => {
    fetch(`http://localhost:8080/eurolyga`)
        .then(res => res.json())
        .then((matches: Match[]) => {
            const matchesContainer = document.querySelector('#matchesContainer') as HTMLDivElement;
            matches.forEach(match => {
                const matchDiv = new MatchCard(match).render();

            matchesContainer.append(matchDiv);
        })
    });
})()

