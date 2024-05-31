const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const container = document.getElementById('container');
const message = document.getElementById('message');
const submitButton = document.getElementById('submit-btn');
const codeContainer = document.getElementById('code');
const resultDiv = document.getElementById('codeEntered');
const endmessage = document.getElementById('endmessage');
let shuffledQuestions, currentQuestionIndex;
let timeLeft = 30;
let code = [];
document.getElementById("back-btn").addEventListener("click", function() {
    window.location.href = "index.php";
});
submitButton.addEventListener('click', () =>{
    clearPreviousCode();
    submitCode();
});
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    timeLeft = 30;
    if(shuffledQuestions.length > currentQuestionIndex){
        startCountdown();
        setNextQuestion();
    }else{
        crackTheCode();
    }
})
let tp = "";
let totalTime = 0;
function startGame(index) {
    startCountdown();
    container.classList.remove('hide');
    container.classList.add('container');
    document.getElementById('tartalom').classList.remove('tartalom');
    document.getElementById('tartalom').classList.add('hide');

    switch (index) {
        case 1:
            shuffledQuestions = basicQuestions.sort(() => Math.random() - .5);
            console.log("Kiválasztott mód: általános");
            tp = "Általános";
            break;
        case 2:
            shuffledQuestions = sportQuestions.sort(() => Math.random() - .5);
            console.log("Kiválasztott mód: sport");
            tp = "Sport";
            break;
        case 3:
            shuffledQuestions = literatureQuestions.sort(() => Math.random() - .5);
            console.log("Kiválasztott mód: irodalom")
            tp = "Irodalom";
            break;
        case 4:
            shuffledQuestions = mathQuestions.sort(() => Math.random() - .5);
            console.log("Kiválasztott mód: matek")
            tp = "Matek";
            break;
        default:
            console.log("Nem található ilyen témakörű kvíz!");
    }
    currentQuestionIndex = 0;
    for (let i = 0; i < shuffledQuestions.length; i++) {
        let random = Math.floor(Math.random() * 10);
        code.push(random);
        console.log(random);
    }
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    nextButton.classList.add('hide');
    resetMessage();
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer() {
    clearInterval(countdown);
    totalTime = totalTime + (30-timeLeft);
    if (timeLeft === 0) {
        setMessage("Lejárt az idő!", false);
    } else {
        let isCorrect = this.dataset.correct === 'true';
        if (isCorrect) {
            setMessage("A válasz helyes! A kód egyik száma: "+code[currentQuestionIndex], true);
        } else {
            setMessage("A válasz helytelen!", false);
        }
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    
    nextButton.classList.remove('hide');
}

function setMessage(ms, b) {
    if (b === true) {
        message.classList.add('correctMS');
    } else {
        message.classList.add('wrongMS');
    }
    message.innerText = ms
}
function resetMessage() {
    message.classList.remove('correctMS');
    message.classList.remove('wrongMS');
    message.innerText = "";
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}



//timer
function startCountdown() {
    
    countdownElement.innerHTML = `<svg id="countdown-svg" width="40" height="40">
                                        <circle id="countdown-circle" r="18" cx="20" cy="20" fill="transparent" stroke="#ffffff" stroke-width="4"></circle>
                                        <text id="countdown-text" x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">${timeLeft}</text>
                                   </svg>`;

    countdown = setInterval(() => {
        timeLeft--;
        const countdownCircle = document.getElementById('countdown-circle');
        const countdownText = document.getElementById('countdown-text');
        countdownText.textContent = timeLeft;

        const circumference = 2 * Math.PI * countdownCircle.getAttribute('r');
        const strokeDashoffset = circumference * (1 - timeLeft / 30);
        countdownCircle.style.strokeDasharray = `${circumference}px`;
        countdownCircle.style.strokeDashoffset = `${strokeDashoffset}px`;

        if (timeLeft === 0) {
            selectAnswer();
        }
    }, 1000);
}

function startCountdownCode(){
    countdownElement.removeChild(countdownElement.firstChild);
    let codetimeleft = 60;
    countdownElement.innerHTML = `<svg id="countdown-svg" width="40" height="40">
                                        <circle id="countdown-circle" r="18" cx="20" cy="20" fill="transparent" stroke="#ffffff" stroke-width="4"></circle>
                                        <text id="countdown-text" x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">${codetimeleft}</text>
                                   </svg>`;

    countdown = setInterval(() => {
        codetimeleft--;
        const countdownCircle = document.getElementById('countdown-circle');
        const countdownText = document.getElementById('countdown-text');
        countdownText.textContent = codetimeleft;

        const circumference = 2 * Math.PI * countdownCircle.getAttribute('r');
        const strokeDashoffset = circumference * (1 - codetimeleft / 30);
        countdownCircle.style.strokeDasharray = `${circumference}px`;
        countdownCircle.style.strokeDashoffset = `${strokeDashoffset}px`;

        if (codetimeleft === 0) {
            win(false);
            timesUp()
        }
    }, 1000);
}
function timesUp(){
    clearInterval(countdown);
    setMessage("Sajnálom nem sikerült!", false);
    setBackToMainButton();
}
function setBackToMainButton(){
    submitButton.classList.add('hide');
    const main = document.getElementById('back-btn');
    main.classList.remove('hide');
}
function crackTheCode(){
    resetState();
    questionElement.innerText = "Törd fel a zárat!"
    startCountdownCode();

    const codeContainer = document.getElementById('code');
    codeContainer.classList.remove('hide');
    for (let i = 0; i < shuffledQuestions.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('code-cell');
        input.maxLength = 1;
        input.addEventListener('input', restrictToNumbers);
        input.addEventListener('keyup', skipToNextOrPrev);
        input.addEventListener('keypress',function(event) {
            if (event.keyCode === 13) {
                clearPreviousCode();
                submitCode();
            }
        });
        codeContainer.appendChild(input);
    }
    
    submitButton.classList.remove('hide');
}
function restrictToNumbers(event) {
    const inputData = event.data;
    if (inputData) {
        const charCode = inputData.charCodeAt(0);
        if (charCode && (charCode < 48 || charCode > 57)) {
            this.value = '';
        }
    }
}

function skipToNextOrPrev(event) {
    const keyCode = event.keyCode;
    if (keyCode === 8) { 
        const currentIndex = Array.from(this.parentElement.children).indexOf(this);
        if (this.value === '' && currentIndex > 0) {
            this.parentElement.children[currentIndex - 1].focus();
        }
    } else if (this.value !== '') { 
        const currentIndex = Array.from(this.parentElement.children).indexOf(this);
        if (currentIndex < shuffledQuestions.length - 1) {
            this.parentElement.children[currentIndex + 1].focus();
        }
    }
}
function submitCode(){
    console.log('submit');
    const userCode = getUserEnteredCode();
    
    resultDiv.classList.remove('hide');
    if (userCode.length !== code.length || userCode.some(cell => isNaN(cell))) {
        return;
    }

    for (let i = 0; i < code.length; i++) {
        const digit = userCode[i];
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('code-cell');
        input.readOnly = true;
        input.maxLength = 1;
        if (digit === code[i]) {
            input.classList.add('correctans');
        } else if (code.includes(digit)) {
            input.classList.add('correctwrongplace');
        }
        input.value = digit;
        resultDiv.appendChild(input);
    }
    if(checkWin(userCode)){
        win(true);
    }
}

function win(state){
    clearInterval(countdown);
    totalTime = totalTime + countdown;
    if(state){
        
        var _data = {
            "time": totalTime,
            "type": tp,
        }
        fetch("tarol.php", {
            "method": "POST",
            "headers": {
                "Content-Type" : "application/json; charset=utf-8"
            },
            "body" : JSON.stringify(_data)
        }).then(function(response){
            return response.text();
          }).then(function(data){
            //console.log(data)
          })
        setBigMessage("Gratulálok!", true);
    }else{
        setBigMessage("Sajnálom nem sikerült!", false);
    }
    const top = document.getElementById('question-container');
    top.classList.add('hide');
    
    setBackToMainButton();
}
function setBigMessage(ms, b){
    if(b === true){
        endmessage.classList.add('correctMSB');
    }else{
        endmessage.classList.add('correctMSB');
    }
    endmessage.innerText = ms;
}

function checkWin(userCode) {
    for (let i = 0; i < code.length; i++) {
        if (userCode[i] !== code[i]) {
            return false;
        }
    }
    return true;
}
function clearPreviousCode() {
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
}

function getUserEnteredCode() {
    const userCodeInputs = document.querySelectorAll(".code-cell");
    let userCode = [];
    userCodeInputs.forEach(input => {
        userCode.push(parseInt(input.value));
    });
    return userCode;
}

const basicQuestions = [
    {
        question: 'Ki volt az első ember a Holdon?',
        answers: [
            { text: 'Neil Armstrong', correct: true },
            { text: 'Buzz Aldrin', correct: false },
            { text: 'Yuri Gagarin', correct: false},
            { text: 'John Glenn', correct: false}
        ]
    },
    {
        question: 'Melyik évben kezdődött az 1. világháború?',
        answers: [
            { text: '1908', correct: false },
            { text: '1914', correct: true },
            { text: '1918', correct: false },
            { text: '1922', correct: false }
        ]
    },
    {
        question: 'Melyik állat a nemzeti jelképe Kínának?',
        answers: [
            {text: 'Panda', correct: true },
            {text: 'Tigris', correct: false },
            {text: 'Sárkány', correct: false },
            {text: 'Oroszlán', correct: false }
        ]
    },
    {
        question: 'Ki írta a Rómeó és Júlia című drámát?',
        answers: [
            { text: 'Charles Dickens', correct: false },
            { text: 'Jane Austen', correct: false },
            { text: 'Fyodor Dostoevsky', correct: false },
            { text: 'William Shakespeare', correct: true }
        ]
    },
    {
        question: 'Ki festette a "Mona Lisát"?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Michelangelo Buonarroti', correct: false }
        ]
    },
    {
        question: 'Melyik növényt ültetik gyakran kertekben, és a virágai felfelé nyílnak a napfény felé?',
        answers: [
            {text: 'Szegfű', correct: false},
            {text: 'Ibolya', correct: false},
            {text: 'Liliom', correct: false},
            {text: 'Napraforgó', correct: true}
        ]
    }
]


const sportQuestions = [

    {
        question: 'Melyik játékos tartja jelenleg a mindenkori legtöbb pontot szerző kosárlabdázó rekordját az NBA-ben?',
        answers: [
            { text: 'LeBron James', correct: true },
            { text: 'Kobe Bryant', correct: false },
            { text: 'Michael Jordan', correct: false },
            { text: 'Kareem Abdul-Jabbar', correct: false }
        ]
    },
    {
        question: 'Melyik játékos a mindenkori legtöbb gólt szerző a labdarúgó-világbajnokság történetében?',
        answers: [
            { text: 'Miroslav Klose', correct: true },
            { text: 'Lionel Messi', correct: false },
            { text: 'Pelé', correct: false },
            { text: 'Cristiano Ronaldo', correct: false }
        ]
    },
    {
        question: 'Melyik évben rendezték meg az első FIFA labdarúgó-világbajnokságot?',
        answers: [
            { text: '1926', correct: false },
            { text: '1930', correct: true },
            { text: '1934', correct: false },
            { text: '1938', correct: false }
        ]
    },
    {
        question: 'Melyik ország nyerte meg a legtöbb férfi kézilabda világbajnokságot?',
        answers: [
            { text: 'Németország', correct: false },
            { text: 'Franciaország', correct: true },
            { text: 'Oroszország', correct: false },
            { text: 'Spanyolország', correct: false }
        ]
    },
    {
        question: 'Melyik klub nevezhető La Liga-ban a "Blaugrana"-nak, azaz a kék-vörös csíkosaknak?',
        answers: [
            { text: 'Real Madrid', correct: false },
            { text: 'Atlético Madrid', correct: false },
            { text: 'Fc Barcelona', correct: true },
            { text: 'Valencia CF', correct: false }
        ]
    },
    {
        question: 'Ki a magyar válogatott labdarúgó csapatkapitánya?',
        answers: [
            { text: 'Szoboszlai Dominik', correct: true },
            { text: 'Willi Orbán', correct: false },
            { text: 'Gulácsi Péter', correct: false },
            { text: 'Ádám Martin', correct: false }
        ]
    }
]

const mathQuestions = [
    {
        question: 'Mi az 5x5-ös tábla területe?',
        answers: [
            { text: '20', correct: false },
            { text: '25', correct: true },
            { text: '30', correct: false },
            { text: '35', correct: false }
        ]
    },
    {
        question: 'Ha egy háromszögnek a három oldala 3 cm, 4 cm és 5 cm, mi a területe?',
        answers: [
            { text: '6 cm^2', correct: true },
            { text: '8 cm^2', correct: false },
            { text: '10 cm^2', correct: false },
            { text: '12 cm^2', correct: false }
        ]
    },
    {
        question: 'Mi az összege az első tíz pozitív páros számnak?',
        answers: [
            { text: '45', correct: false },
            { text: '50', correct: false },
            { text: '55', correct: false },
            { text: '60', correct: true }
        ]
    },
    {
        question: 'Mennyi az 1/4 és a 1/3 közös nevezője?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: false },
            { text: '12', correct: true },
            { text: '15', correct: false }
        ]
    },
    {
        question: 'Mi 64 négyzetgyöke?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true },
            { text: '12', correct: false },
            { text: '20', correct: false }
        ]
    },
    {
        question: 'Hány különböző módon lehet kiválasztani 3 különböző gyümölcsöt egy 10 féle gyümölcsből álló kosárból?',
        answers: [
            { text: '30', correct: false },
            { text: '90', correct: false },
            { text: '120', correct: true },
            { text: '720', correct: false }
        ]
    }
]

const literatureQuestions = [
    {
        question: 'Ki írta a "Háború és béke" című klasszikus regényt?',
        answers: [
            { text: 'Victor Hugo', correct: false },
            { text: 'Lev Tolstoy', correct: true },
            { text: 'Gustave Flaubert', correct: false },
            { text: 'Fjodor Dostojevszkij', correct: false }
        ]
    },
    {
        question: 'Melyik a legelső "Harry Potter..." könyv?',
        answers: [
            { text: '"Harry Potter és a Tűz Serlege"', correct: false },
            { text: '"Harry Potter és az Azkabani Fogoly"', correct: false },
            { text: '"Harry Potter és a Titkok Kamrája"', correct: false },
            { text: '"Harry Potter és a Bölcsek Köve"', correct: true }
        ]
    },
    {
        question: 'Ki írta a "Kis herceg" című meseregényt?',
        answers: [
            { text: 'J.K. Rowling', correct: false },
            { text: 'Roald Dahl', correct: false },
            { text: 'Antoine de Saint-Exupéry', correct: true },
            { text: 'Lewis Carroll', correct: false }
        ]
    },
    {
        question: 'Mi a főszereplő ellentéte az irodalomban?',
        answers: [
            { text: 'Antihős', correct: true },
            { text: 'Antagonista', correct: false },
            { text: 'Tragikus hős', correct: false },
            { text: 'Megmentő', correct: false }
        ]
    },
    {
        question: 'Mi a novella?',
        answers: [
            { text: 'Egy versforma, melyben a sorokban szabályos ritmus és rímek vannak.', correct: false },
            { text: 'Egy hosszú, bonyolult regény, melynek sok mellékszálát és karakterét tartalmaz.', correct: false },
            { text: 'Egy rövid, tömör prózai műfaj, általában egyetlen eseménysort vagy jellemfejlődést ölel fel.', correct: true },
            { text: 'Egy drámai műfaj, melyben a szereplők szóban kifejezik magukat és cselekedeteiket.', correct: false }
        ]
    },
    {
        question: 'Ki Micimackó legjobb barátja?',
        answers: [
            { text: 'Nyuszi', correct: false },
            { text: 'Malacka', correct: true },
            { text: 'Tigris', correct: false },
            { text: 'Füles', correct: false }
        ]
    }
]