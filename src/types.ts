type Team = {
    name: string,
    score?: number,
    logo: string,
    [key: string]: string | number | boolean | undefined
  }
  type Match = {
    id: string,
    date: string,
    teams: [Team, Team]
  }
  
  export { Team, Match };