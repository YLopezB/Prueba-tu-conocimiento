const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startButton = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionSpan = document.getElementById("total-questions")
const scoreSpan = document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("max-score")
const resultMessage = document.getElementById("result-message")
const restarButton = document.getElementById("restart-btn")
const progressBar = document.getElementById("progress")

const preguntas = [
  {
    pregunta: "¿Cuál es el lenguaje de programación creado por James Gosling?",
    respuestas: [
      { text: "Python", correct: false },
      { text: "Java", correct: true },
      { text: "C#", correct: false },
      { text: "Ruby", correct: false }
    ]
  },
  {
    pregunta: "¿Qué significa HTML?",
    respuestas: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Mark Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "High Text Machine Language", correct: false }
    ]
  },
  {
    pregunta: "¿Qué propiedad de CSS controla el tamaño del texto?",
    respuestas: [
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
      { text: "font-style", correct: false },
      { text: "text-transform", correct: false }
    ]
  },
  {
    pregunta: "¿Cuál de estos es un sistema de control de versiones?",
    respuestas: [
      { text: "Git", correct: true },
      { text: "Linux", correct: false },
      { text: "MySQL", correct: false },
      { text: "Docker", correct: false }
    ]
  },
  {
    pregunta: "¿Qué significa la sigla API?",
    respuestas: [
      { text: "Application Programming Interface", correct: true },
      { text: "Applied Programming Internet", correct: false },
      { text: "Advanced Protocol Interface", correct: false },
      { text: "Application Protocol Internet", correct: false }
    ]
  },
  {
    pregunta: "¿Cuál es el resultado de 2 + '2' en JavaScript?",
    respuestas: [
      { text: "4", correct: false },
      { text: "'22'", correct: true },
      { text: "NaN", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    pregunta: "¿Qué etiqueta HTML se usa para insertar JavaScript?",
    respuestas: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false }
    ]
  },
  {
    pregunta: "¿Cuál de los siguientes es un framework de JavaScript?",
    respuestas: [
      { text: "React", correct: true },
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "Spring Boot", correct: false }
    ]
  },
  {
    pregunta: "¿En qué año se lanzó oficialmente Python?",
    respuestas: [
      { text: "1991", correct: true },
      { text: "1989", correct: false },
      { text: "2000", correct: false },
      { text: "1995", correct: false }
    ]
  },
  {
    pregunta: "¿Qué significa la propiedad CSS 'overflow: hidden'?",
    respuestas: [
      { text: "Oculta el contenido que se desborda", correct: true },
      { text: "Muestra una barra de scroll", correct: false },
      { text: "Duplica el contenido", correct: false },
      { text: "Hace visible todo el contenido", correct: false }
    ]
  }
]

let currentQuestionIndex = 0
let score = 0
let answersDisabled = false

totalQuestionSpan.textContent = preguntas.length
maxScoreSpan.textContent = preguntas.length

startButton.addEventListener("click", startQuiz)
restarButton.addEventListener("click", restartQuiz)

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    scoreSpan.textContent = 0
    startScreen.classList.remove("active")
    quizScreen.classList.add("active")
    showQuestion()
}

function showQuestion() {
    answersDisabled = false
    const currentQuestion = preguntas[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1
    const progressPercent = (currentQuestionIndex / preguntas.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.pregunta

    answersContainer.innerHTML = ""

    currentQuestion.respuestas.forEach(resp => {
        const button = document.createElement("button")
        button.textContent = resp.text
        button.classList.add("answer-btn")
        button.dataset.correct = resp.correct
        button.addEventListener("click", selectAnswer)
        answersContainer.appendChild(button)
    })
}

function selectAnswer(e){
    if(answersDisabled) return
    answersDisabled = true
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        } else if (button === selectedButton) {
            button.classList.add("incorrect")
        }
    })

    if(isCorrect) {
        score++
        scoreSpan.textContent = score
    }
    setTimeout(() => {
        currentQuestionIndex++
        if (currentQuestionIndex < preguntas.length) {
            showQuestion()
        } else {
            showResult()
        }
    },2000)
}

function showResult(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score
    const percentage = (score/preguntas.length) *100
    if(percentage === 100){
        resultMessage.textContent = "Perfecto, eres un genio"
    }else if(percentage >= 80){
        resultMessage.textContent = "¡Buen trabajo! ¡Sabes lo que haces!"
    }else if(percentage >= 60){
        resultMessage.textContent = "¡Buen esfuerzo! ¡Sigue aprendiendo!"
    }else if(percentage >= 40){
        resultMessage.textContent = "¡No está mal! ¡Inténtalo de nuevo para mejorar!"
    } else {
        resultMessage.textContent = "¡Sigue estudiando! ¡Mejorarás!"
    }
    }

function restartQuiz(){
    resultScreen.classList.remove("active")
    startQuiz()
}