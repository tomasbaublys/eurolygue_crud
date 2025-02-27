import { Match } from "./types.js";

export default class MatchCard{
  private match: Match;
  constructor(props: Match){
    console.log(props);
    this.match = props;
  }
  render(){
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
      if(team.score){
        score.textContent = team.score.toString();
      } else {
        score.textContent = 'tbd';
      }
      
      teamDiv.append(teamImg, teamName, score);
      teamsDiv.appendChild(teamDiv);
    });
    
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');

    const dateSpan = document.createElement('span');
    dateSpan.innerHTML = this.returnMatchDate(this.match.date);

    dateDiv.appendChild(dateSpan);
    
    matchCard.append(teamsDiv, dateDiv);
    return matchCard;
  }

  returnMatchDate(matchDate:string): string{
    const today = new Date().toISOString().split('T')[0];
    const matchHour = matchDate.split('T')[1];

    if(new Date(matchDate) < new Date(today)){
      // console.log(matchDate, 'buvo'); // Feb 6
      return `${(new Date(matchDate)).toString().slice(4,10)}`;
    } else if(matchDate.slice(0,10) === today){
      // console.log(matchDate, 'yra'); // Today   21:30
      return `Today <br> ${matchHour}`;
    } else if(new Date(matchDate).toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()){
      // console.log(matchDate, 'rytoj'); // Tomorrow   21:30
      return `Tomorrow <br> ${matchHour}`;
    } else {
      // console.log(matchDate, 'vėliau nei ryt'); // Wed, Feb 28   21:30
      return `
        ${(new Date(matchDate)).toString().slice(0,3)},
        ${(new Date(matchDate)).toString().slice(4,10)}
        <br>${matchHour}
      `;
    }
  }
}