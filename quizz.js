// quiz.js

function test(){
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = 'cecgdfjgtudsghisug';
}


// Étape 1: Lire le fichier CSV en JavaScript
function readCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      resolve(fileContent);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Étape 2: Analyser les données CSV
function parseCSVData(csvContent) {
  const lines = csvContent.split('\n');
  const questions = [];
  for (let i = 1; i < lines.length; i++) {
    const [question, option1, option2, option3, option4, correctOption] = lines[i].split(',');
    questions.push({ question, options: [option1, option2, option3, option4], correctOption });
  }
  return questions;
}

// Étape 4: Afficher le quiz
function displayQuiz(questions) {
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = '';
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
    question.options.forEach((option, optionIndex) => {
      const optionElement = document.createElement('input');
      optionElement.type = 'radio';
      optionElement.name = `question${index}`;
      optionElement.value = optionIndex;
      optionElement.addEventListener('change', () => checkAnswer(index, optionIndex));
      questionElement.appendChild(optionElement);
      questionElement.appendChild(document.createTextNode(option));
      questionElement.appendChild(document.createElement('br'));
    });
    quizContainer.appendChild(questionElement);
  });
}

// Étape 5: Gérer les réponses
function checkAnswer(questionIndex, selectedOption) {
  // Vérifie si la réponse sélectionnée est correcte et traite les scores ici.
}

// Étape 3: Fonction principale pour démarrer le quiz
async function startQuiz() {
  try {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const csvContent = await readCSVFile(file);
      const questions = parseCSVData(csvContent);
      displayQuiz(questions);
    });
    fileInput.click();
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier CSV :', error);
  }
}