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

export { Team, Match };