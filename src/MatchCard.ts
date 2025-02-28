import { Match } from "./types.js";

export default class MatchCard{
  private match: Match;
  constructor(props: Match){
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

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('bi', 'bi-trash-fill');
    deleteIcon.addEventListener('click', () => this.deleteCard(matchCard));
    
    matchCard.append(teamsDiv, dateDiv, deleteIcon);
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
  deleteCard(matchCard: HTMLDivElement) {
    console.log(matchCard);

    const deleteConfirmModal = document.createElement('dialog');
    matchCard.appendChild(deleteConfirmModal);
    deleteConfirmModal.showModal();

    const deleteConfirmText = document.createElement('h3');
    deleteConfirmText.textContent = 'Are you sure you want to delete this?';
    const cancelDeleteButton = document.createElement('button');
    cancelDeleteButton.textContent = 'No';
    const confirDeleteButton = document.createElement('button');
    confirDeleteButton.textContent = 'Yes';

    deleteConfirmModal.append(deleteConfirmText, cancelDeleteButton, confirDeleteButton);

    cancelDeleteButton.addEventListener('click', () => {
      deleteConfirmModal.remove();
    });
    deleteConfirmModal.addEventListener('keydown', e => {
      if(e.key === 'Escape') {
        deleteConfirmModal.remove();
      }
    });
    deleteConfirmModal.addEventListener('click', e => {
      if(
        e.offsetX < 0 || e.offsetY < 0 || 
        e.offsetX > deleteConfirmModal.offsetWidth ||
        e.offsetY > deleteConfirmModal.offsetHeight
      ){
        deleteConfirmModal.remove();      
      }
    });
    confirDeleteButton.addEventListener('click', () => {
      fetch(`http://localhost:8080/eurolyga/${this.match.id}`, {
        method: "DELETE"
      })
      .then(res => res.status === 200 && matchCard.remove());
    });
  }
}