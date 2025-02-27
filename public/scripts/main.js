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
(() => {
    const addForm = document.querySelector('#addNewMatch');
    addForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(addForm);
        const formInputs = { teams: [{}, {}] };
        formData.forEach((value, key) => {
            const [, nr, small] = key.split('_');
            if (key.split('_')[0] === 'teams') {
                if (small === 'score') {
                    formInputs.teams[Number(nr)][small] = Number(value);
                }
                else {
                    formInputs.teams[Number(nr)][small] = value;
                }
            }
            else {
                formInputs[key] = value;
            }
        });
        console.log(formInputs);
    });
})();
(() => {
    const dateInput = document.querySelector('input#date');
    dateInput.addEventListener('change', () => {
        const inputs = document.querySelectorAll(`input[name*='_score']`);
        if (new Date(dateInput.value) < new Date()) {
            inputs.forEach((input) => {
                input.removeAttribute('disabled');
            });
        }
        else {
            inputs.forEach((input) => {
                input.setAttribute('disabled', '');
            });
        }
    });
})();
