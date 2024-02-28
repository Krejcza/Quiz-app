const questions = [

   {
      question: 'V kterém roce vyšla první Mario hra?',
      answers: [
         {text: '2000', correct: false},
         {text: '1985', correct: true},
         {text: '1974', correct: false},
         {text: '1990', correct: false},
      ]
   },{
      question: 'Proti komu válčíte ve hře Saboteur?',
      answers: [
         {text: 'Francie', correct: false},
         {text: 'Anglie', correct: false},
         {text: 'Rusko', correct: false},
         {text: 'Německo', correct: true},
      ]
   },{
      question: 'Jak se jmenuje hlavní protagonista ve hře God of War?',
      answers: [
         {text: 'Loki', correct: false},
         {text: 'Baldur', correct: false},
         {text: 'Kratos', correct: true},
         {text: 'Zeus', correct: false},
      ]
   },{
      question: 'Která mainstream konzole vyšla jako první?',
      answers: [
         {text: 'Atari', correct: true},
         {text: 'Playstation', correct: false},
         {text: 'Wii', correct: false},
         {text: 'Xbox', correct: false},
      ]
   }
]

const questionElement = document.querySelector('#question')
const answerBtns = document.querySelector('#answer-buttons')
const nextBtn = document.querySelector('#next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
   currentQuestionIndex = 0
   score = 0
   nextBtn.innerHTML = 'Next'
   showQuestion()
}

function showQuestion(){

   resetState()

   let currentQuestion = questions[currentQuestionIndex]
   let questionNO = currentQuestionIndex +1
   questionElement.innerHTML = questionNO + '. ' + currentQuestion.question



   currentQuestion.answers.forEach(function(answer){
      const button = document.createElement('button')
      button.innerHTML = answer.text
      button.classList.add('btn')
      answerBtns.appendChild(button)

      if(answer.correct){
         button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)

   })
}

function resetState(){
   nextBtn.style.display = 'none'
   while(answerBtns.firstChild){
      answerBtns.removeChild(answerBtns.firstChild)
   }
}

function selectAnswer(e){
   const selectedBTN = e.target
   const isCorrect = selectedBTN.dataset.correct === 'true'

   if(isCorrect){
      selectedBTN.classList.add('correct')
      score++
   } else{
      selectedBTN.classList.add('incorrect')
   }
   Array.from(answerBtns.children).forEach(function(button){
      if(button.dataset.correct === 'true'){
         button.classList.add('correct')
      }
      button.disabled = true
   })
   nextBtn.style.display = 'block'
}

function showScore(){
   resetState()
   questionElement.innerHTML = `Dosáhli jste ${score} bodů z ${questions.length} dostupných!`
   nextBtn.innerHTML = 'Hádat znovu'
   nextBtn.style.display = 'block'  
}


function handleNextButton(){
   currentQuestionIndex ++
   if(currentQuestionIndex < questions.length){
      showQuestion()
   } else{
      showScore()
   }
}


nextBtn.addEventListener('click', function(click){
   if(currentQuestionIndex < questions.length){
      handleNextButton()
   } else{
      startQuiz()
   }
})


startQuiz()