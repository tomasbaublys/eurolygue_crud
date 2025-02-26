export default class MatchCard {
    constructor(props) {
        this.match = props;
    }
    render() {
        const matchCard = document.createElement('div');
        matchCard.classList.add('matchCard');
        const teamsDiv = document.createElement('div');
        teamsDiv.classList.add('teams');
        this.match.teams.forEach(team => {
            const teamDiv = document.createElement('div');
            const teamImg = document.createElement('img');
            teamImg.setAttribute('src', team.logo);
            teamImg.setAttribute('alt', `${team.name} logo`);
            const teamName = document.createElement('h4');
            teamName.textContent = team.name;
            const score = document.createElement('span');
            if (team.score) {
                score.textContent = team.score.toString();
            }
            else {
                score.textContent = 'tbd';
            }
            teamDiv.append(teamImg, teamName, score);
            teamsDiv.appendChild(teamDiv);
        });
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const dateSpan = document.createElement('span');
        dateSpan.textContent = this.returnMatchDate(this.match.date);
        dateDiv.appendChild(dateSpan);
        matchCard.append(teamsDiv, dateDiv);
        return matchCard;
    }
    returnMatchDate(matchDate) {
        const today = new Date().toISOString().split('T')[0];
        if (new Date(matchDate) < new Date(today)) {
            console.log(matchDate, 'buvo');
        }
        else if (new Date(matchDate.slice(0, 10)) === new Date(today)) {
            console.log(matchDate, 'yra');
        }
        return matchDate;
    }
}
