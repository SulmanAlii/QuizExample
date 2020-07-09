
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;

}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}
Question.prototype.isCorrectAnswer = function (choice) {
    userAnswers.push(choice);
    return this.answer === choice;
}

function populate() {
    if (quiz.isEnded()) {
        showScores();
        for (var i = 0; i < questions.length; i++) {
            isWrong(questions[i], i);
            alert("You correctly answers:" +  quiz.score  + " of " +questions.length);
        }
        if(quiz.score>=5){
            alert("YOU WON, CONGRATULATIONS!");
        }
        if(quiz.score<5){
            alert("YOU LOSED, TRY AGAIN");
            quiz.score = 0;
        }

    } else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

var userAnswers = [];

//Show Wrong Answers
function isWrong(question,index) {

    var answer = userAnswers[index];
    alert("User answer for question " + (index+1) + ": " + userAnswers[index]);
    if(answer == question["answer"]){
        alert("Correct");
    }
    else{
        //incorrectA.push(index);
        alert('Sorry. The correct answer is ' + question["answer"]);
    }
    //for (var i =
    /*
    if(quiz.score>=5){
        alert("YOU WON, CONGRATULATIONS!");
    }
    if(quiz.score<5){
        alert("YOU LOSED, TRY AGAIN");
        quiz.score = 0;
    }
*/
}
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};


var questions = [
    new Question("What is the name of the club where Lionel Messi plays?", ["Fc Barcelona", "Chelsea", "Manchester City", "Real Madrid"], "Fc Barcelona"),
    new Question("In which league of the world is Crystal Palace?", ["German League", "France League", "Premier League", "La Liga"], "Premier League"),
    new Question("What team is Andrés Iniesta currently playing in?", ["Fc Barcelona", " Club Fuentealbilla", "Vissel Kobe", "None of the above"], "Vissel Kobe"),
    new Question("Pep Guardiola in which leagues he has trained?", ["La Liga", "German League", "Premier League", "All"], "All"),
    new Question("Which team won the Champions League in the 2018/2019 season?", ["Real Madrid", "Liverpool", "Fc Barcelona", "PSG"], "Liverpool")



];
//Create New Quiz
var quiz = new Quiz(questions);
//show Quiz
populate();