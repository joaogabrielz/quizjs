//INITIAL DATA
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

//EVENTS
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//FUNCTIONS
function showQuestion(){
    if(questions[currentQuestion] ){
        let q = questions[currentQuestion];

        let porcent = Math.floor((currentQuestion / questions.length) * 100);
        
        document.querySelector('.progress--bar').style.width = `${porcent}%`;
        

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        //document.querySelector('.options').innerHTML = '';

    // quanto mais mudar o DOM + processamento
    // change DOM requires more processing..

    // for(let i in q.options){
    //     document.querySelector('.options').innerHTML += `<div>${q.options[i]}</div>`;

    // }

    // + Performace:
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class='option'><span>${parseInt(i) + 1}</span>${q.options[i]}</div> `;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })

        }
        else{
            //acabaram as questoes
            finishQuiz();
        }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
   // console.log('clickou em', e.target.getAttribute('data-op'));
   if(questions[currentQuestion].answer === clickedOption){
    correctAnswers ++;
    document.querySelector('.option').style.backgroundColor = 'red';
   }
  
   currentQuestion++;
   showQuestion();
}
function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim em ?! &#128517';
        document.querySelector('.scorePct').style.color = '#FF0000';
    }
    else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom! &#128521 ';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }
    else{
        document.querySelector('.scoreText1').innerHTML = 'Parabéns! &#129321';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = "100%";

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;
}

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}