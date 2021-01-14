const word_table = document.querySelector('.table');
const add_btn = document.querySelector('.add_btn');

let data = [];
let howManyList = 1;

function deleteWordList(event){
    const td = event.target.parentNode.parentNode;
    const tbody = td.parentNode;
    tbody.removeChild(td);
    const remained_data = data.filter(function(word) {
        return word.id !== parseInt(td.id);
    });
    data = [];
    if(remained_data.length == 0){
        localStorage.setItem('wordList_Data','[]');
    }else{
        remained_data.forEach(function(obj) {
        saveWordList(obj.word, obj.meaning);
        });
    }
}

function saveWordList(word, meaning){
    const wordList_Obj = {
        word,
        meaning,
        id: data.length + 1
    };

    data.push(wordList_Obj);
    localStorage.setItem('wordList_Data', JSON.stringify(data));
}

function paintWordList(word, meaning){
        var new_wordList = document.createElement("tr");
        word_table.insertBefore(new_wordList, add_btn);
        
        new_wordList.id = howManyList;
        howManyList++;
        
        var new_word = document.createElement("td");
        var new_meaning = document.createElement("td");
        var delete_button = document.createElement("td");
        var delete_img = document.createElement("img");
        delete_img.src = "x.png";
        delete_img.alt = "delete button";
        new_wordList.appendChild(new_word);
        new_wordList.appendChild(new_meaning);
        new_wordList.appendChild(delete_button);
        delete_button.appendChild(delete_img);
        delete_img.addEventListener('click', deleteWordList);

        new_word.innerText = word;
        new_meaning.innerText = meaning;
}

function addWordList(){
    var ask_word = prompt("Enter a new word");
    if(ask_word != "" && ask_word != null){
        var ask_meaning = prompt("Enter the meaning of the word");
        if(ask_meaning != "" && ask_meaning != null){
            saveWordList(ask_word, ask_meaning);
            paintWordList(ask_word, ask_meaning);
        }
    }
}

function loadWordList(){
    data = JSON.parse(localStorage.getItem('wordList_Data'));
    data.forEach(function(data){
        paintWordList(data.word, data.meaning);
    })
}

function init() {
    if (localStorage.getItem('wordList_Data') === null) {
        localStorage.setItem('wordList_Data','[]');
    }
    add_btn.addEventListener('click', addWordList);
    loadWordList();
}

init();