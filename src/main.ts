type Team = {
    name: string,
    score: number,
    logo: string,
}

type Match = {
    id: string,
    date: string,
    teams: [Team, Team]
}

((): void => {
    fetch(`http://localhost:8080/eurolyga`)
        .then(res => res.json())
        .then((matches: Match[]) => {
            const matchesContainer = document.querySelector('#matchesContainer') as HTMLDivElement;
            matches.forEach(match => {
            

            matchesContainer?.append();
        })
    });
})()

