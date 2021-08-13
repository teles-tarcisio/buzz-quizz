function launchQuizz(element) {
    console.log(element);
    let mainScreen = document.querySelector("main");
    mainScreen.innerHTML = "";
    mainScreen.innerHTML += insertSelectedQuizz();
}

function insertSelectedQuizz() {
    const insertQuiz = `
    <div class="quiz">
            <div class="quizTitle">
                <img src="/images/quiztitleharrypotter.png">
                <p>O quão Potterhead é você?</p>
            </div>
            <ul>
                <li class="questionTitle">
                    <p>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</p>
                </li>
                <li class="questionAnswer">
                    <img src="/images/Gatineo.png">
                    <p>Gatineo</p>
                </li>
                <li class="questionAnswer">
                    <img src="/images/Gatineo.png">
                    <p>Ratata</p>
                </li>
                <li class="questionAnswer">
                    <img src="/images/Gatineo.png">
                    <p>Sapo gordo</p>
                </li>
                <li class="questionAnswer">
                    <img src="/images/Gatineo.png">
                    <p>Mustela putorius (o Furão)</p>
                </li>
            </ul>
        </div>`;
        return insertQuiz;
}


function launchResult(element) {
    console.log(element);
    let mainScreen = document.querySelector("main");
    mainScreen.innerHTML = "";
    mainScreen.innerHTML += insertQuizResult();
}

function insertQuizResult() {
    const insertResult = `
    <div class="quiz-result">
            <div class="quiz-result-title">
                <h1>88% de acerto: Você é praticamente um aluno de Hogwarts!</h1>
            </div>
            <div class="quiz-result-text">
                <img src="/images/simpsons.png">
                <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão
                    abaixo para usar o vira-tempo e reiniciar este teste.</p>
            </div>
        </div>
        <div class="final-page-options">
            <button>
                Reiniciar Quizz
            </button>
            <p onclick="window.location.reload()">Voltar para home</p>
        </div>`;
        return insertResult;
}


/* -----------------------------------------------*/
function launchSelectedQuizz() {
    let mainScreen = document.querySelector("main");
    mainScreen.innerHTML = "";

    let quizID = 1;
    const quizzPromise = axios.get(`${QUIZZES_URL}` + quizID);
    quizzPromise.then(launchFriendsQuizz);
    quizzPromise.catch(console.log);
}

function launchFriendsQuizz(response) {
    //quiz banner @ page top:
    let quizzBanner = document.querySelector(".quizz-banner");
    quizzBanner.innerHTML = '';
    quizzBanner.innerHTML += `
        <div class="quiz-title">
            <img src="${response.data.image}">
            <p>${response.data.title}</p>
        </div>`;

    let mainScreen = document.querySelector("main");
    mainScreen.innerHTML += `
    <ul class="question-cards-list">
    </ul>`;

    //-----
    let questionsArray = response.data.questions;
    console.log("qArray: ", questionsArray);
    let numberOfQuestions = questionsArray.length;
    console.log("# of questions: ", numberOfQuestions);
    //-----

    let listOfQuestions = mainScreen.querySelector(".question-cards-list");
    for (i = 0; i < numberOfQuestions; i++) {
        listOfQuestions.innerHTML += `
        <li class="question-card-${i}">
            <ul class="card-content">
            `;
    }
    console.log(listOfQuestions.innerHTML);

    let singleQuestionSlot = listOfQuestions.querySelector(".card-content");
    //inside the card: one question + up to 4 alternatives
    for (j = 0; j < numberOfQuestions; j++) {
        let numberOfSubElements = response.data.questions[j].answers.length;
        console.log("inside the card: ", numberOfSubElements);
        //listOfQuestions.innerHTML += `<li class="question-${j}"> -pergunta${j} aqui- `;       
         singleQuestionSlot.innerHTML += `<li class="question-${j}"> -pergunta${j} aqui- `;
        
        for (k = 0; k < numberOfSubElements; k++) {
            //listOfQuestions.innerHTML += `
            singleQuestionSlot.innerHTML += `
            <li class="answer-${k}">
                img_${j}${k}
                text_${j}${k}
            </li>`;
        }

        //listOfQuestions.innerHTML += `
        singleQuestionSlot.innerHTML += `
        </li>`;
    }

    for (i = 0; i < numberOfQuestions; i++) {
        listOfQuestions.innerHTML += `
            </ul>        
        </li>`;
    }


    /* estrutura tela das questões do quiz:
    <main>
        <ul externa> -> lista dos cards com as perguntas
            <li card 01> -> card correspondente a uma pergunta
                <ul interna> -> lista dos elementos que compoem UM card de pergunta
                    <li pergunta01>
                    </li pergunta01>

                    <li alternativa 01>
                        img alternativa 01
                        texto alternativa 01
                    </li alternativa 01>

                    <li alternativa 02>
                        img alternativa 02
                        texto alternativa 02
                    </li alternativa 02>
                    .
                    ..
                    ...
                </ul interna> -> fecha elementos em UM card de pergunta
            </li card 01> -> fecha o UM card da pergunta

            <li card 02> -> card correspondente a uma pergunta
                <ul interna> -> lista dos elementos que compoem UM card de pergunta
                    <li pergunta02>
                    </li pergunta02>

                    <li alternativa 01>
                        img alternativa 01
                        texto alternativa 01
                    </li alternativa 01>

                    <li alternativa 02>
                        img alternativa 02
                        texto alternativa 02
                    </li alternativa 02>
                    .
                    ..
                    ...
                </ul interna> -> fecha elementos em UM card de pergunta
            </li card 02> -> fecha o UM card da pergunta

            .
            ..
            ...
        </ul ext> -> fecha a lista com todos os cards das perguntas
    </main>    
    */

    console.log("finished response.data.questions array");
}

/* -----------------------------------------------*/