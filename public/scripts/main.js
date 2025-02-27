import MatchCard from "./MatchCard.js";
const addMatchToScreen = (match) => {
    const matchesContainer = document.querySelector('#matchesContainer');
    const matchDiv = new MatchCard(match).render();
    matchesContainer.append(matchDiv);
};
(() => {
    fetch(`http://localhost:8080/eurolyga`)
        .then(res => res.json())
        .then((matches) => {
        matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        matches.forEach(match => {
            addMatchToScreen(match);
        });
    });
})();
(() => {
    const addForm = document.querySelector('#addNewMatch');
    addForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(addForm);
        addForm.reset();
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
        fetch(`http://localhost:8080/eurolyga`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInputs)
        })
            .then(res => res.json())
            .then((match) => {
            console.log(match);
            addMatchToScreen(match);
        });
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
