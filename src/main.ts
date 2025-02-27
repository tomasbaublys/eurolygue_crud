import MatchCard from "./MatchCard.js";
import { Match, Team } from "./types.js";

const addMatchToScreen = (match: Match): void => {
  const matchesContainer = document.querySelector('#matchesContainer') as HTMLDivElement;
  const matchDiv = new MatchCard(match).render();
  matchesContainer.append(matchDiv);
  // matchesContainer?.append();
  // if(matchesContainer){
  //   matchesContainer.append()
  // }
}

// fetch data from API and display it on screen
(():void => {
  fetch(`http://localhost:8080/eurolyga`)
    .then(res => res.json())
    .then((matches: Match[]) => {
      matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      matches.forEach(match => {
        addMatchToScreen(match);
      });
    });
})();

// add Event to the form for new Matches addition
(():void => {
  const addForm = document.querySelector('#addNewMatch') as HTMLFormElement;
  addForm.addEventListener('submit', e => {
    e.preventDefault();
    
    type HelperTypeS = Team & {
      [key: string]: string | number | boolean | undefined 
    };
    type HelperType = Omit<Match, 'id'> & {
      [key: string]: string | number | boolean | undefined | [HelperTypeS, HelperTypeS],
      teams: [HelperTypeS, HelperTypeS]
    };

    const formData = new FormData(addForm);
    addForm.reset();
    const formInputs = { teams: [{},{}] } as HelperType;
    formData.forEach((value, key) => {
      // console.log(value, key);
      //   teams  0   name   = 'teams_0_name'.split('_')
      const [, nr, small] = key.split('_');
      // console.log(big, nr, small);
      if(key.split('_')[0] === 'teams'){
        if(small === 'score'){
          formInputs.teams[Number(nr)][small] = Number(value) as number;
        } else {
          formInputs.teams[Number(nr)][small] = value as string;
        }
      } else {
        formInputs[key] = value as string;
      }
    });
    console.log(formInputs);

    fetch(`http://localhost:8080/eurolyga`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formInputs)
    })
    .then(res => res.json())
    .then((match: Match) => {
      console.log(match);
      addMatchToScreen(match);
    });
  });
})();

// event for date input to check if user can put in scores
(():void => {
  const dateInput = document.querySelector('input#date') as HTMLInputElement;
  dateInput.addEventListener('change', () => {
    // console.log('ivyko change ivykis');
    const inputs = document.querySelectorAll(`input[name*='_score']`) as NodeListOf<HTMLInputElement>;
    if(new Date(dateInput.value) < new Date()){
      inputs.forEach((input) => {
        input.removeAttribute('disabled');
      });
    } else {
      inputs.forEach((input) => {
        input.setAttribute('disabled', '');
        // input.disabled = true;
      });
    }
  });
})();