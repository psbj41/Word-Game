let array = ['computer','bird','move','early','focus','playing'];
let start, previousTimeStamp;
let done = false;

let start_word = document.getElementById("word-start");
let incorrectSection = document.querySelector(".incorrect");
let correctSection = document.querySelector(".correct");
//Math Random
let array_generated = array[Math.floor(Math.random() * array.length)];
start_word.innerText = array_generated;

function transformer(timestamp){
    // code ko niche animate krega
    // requestAnimationFrame se ye animate krega
    if (start === undefined) 
    {
        start = timestamp;
        let array_generated = array[Math.floor(Math.random() * array.length)];
        start_word.innerText = array_generated;
    }
    
    const elapsed = timestamp - start;
    if (previousTimeStamp !== timestamp) {
    // Math.min() is used here to make sure the start_word stops at exactly 500px
        const count = Math.min(0.1 * elapsed, 450);
        start_word.style.transform = 'translateY(' + count + 'px)';
        if (count === 450){
            start_word.style.display="none";
            addIncorrect(start_word.innerText);  
            // window.requestAnimationFrame(transformer);
        } 
    }
    
    if (elapsed < 4500) { // Stop the animation after 4.5 seconds
        previousTimeStamp = timestamp
        !done && window.requestAnimationFrame(transformer);
    }
}

window.requestAnimationFrame(transformer);


function addIncorrect(word){
    // scoreCountRef.innerText = --score;
    incorrectSection.innerHTML =
        incorrectSection.innerHTML + `<div class="incorrect-name">
        <h2>${word}</h2></div>` ;
}

function addCorrect(word){
    correctSection.innerHTML =
    correctSection.innerHTML + `<div class="correct-name">
    <h2>${word}</h2></div>` ;
}

let inputWord = document.querySelector("#input-word");

inputWord.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        if(e.target.value === start_word.innerText){
            addCorrect(start_word.innerText);
        }
    }
});