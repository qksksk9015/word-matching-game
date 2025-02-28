const words = [
    { word: "chatgpt", meaning: "대화형 인공지능으로 사람과 자연스러운 대화를 할 수 있도록 설계된 모델" },
    { word: "드론", meaning: "원격으로 조종할 수 있는 비행 장치로, 촬영, 물품 배송 등에 사용됨." },
    { word: "인공지능", meaning: "인간처럼 사고하고 학습할 수 있는 컴퓨터 시스템." },
    { word: "사물인터넷", meaning: "일상적인 물건들이 인터넷을 통해 연결되어 상호작용하는 기술 (스마트홈 등)" },
    { word: "가상현실(VR)", meaning: "컴퓨터로 생성한 가상의 환경을 체험할 수 있는 기술" }
];

function setupGame() {
    let shuffledWords = [...words].sort(() => Math.random() - 0.5);
    let shuffledMeanings = [...words].sort(() => Math.random() - 0.5);
    
    document.getElementById("words").innerHTML = "";
    document.getElementById("meanings").innerHTML = "";
    
    shuffledWords.forEach(item => {
        let wordDiv = document.createElement("div");
        wordDiv.innerText = item.word;
        wordDiv.classList.add("draggable");
        wordDiv.draggable = true;
        wordDiv.dataset.word = item.word;
        wordDiv.addEventListener("dragstart", dragStart);
        document.getElementById("words").appendChild(wordDiv);
    });
    
    shuffledMeanings.forEach(item => {
        let meaningDiv = document.createElement("div");
        meaningDiv.innerText = item.meaning;
        meaningDiv.classList.add("droppable");
        meaningDiv.dataset.word = item.word;
        meaningDiv.addEventListener("dragover", dragOver);
        meaningDiv.addEventListener("drop", drop);
        document.getElementById("meanings").appendChild(meaningDiv);
    });
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.dataset.word);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let draggedWord = event.dataTransfer.getData("text");
    let target = event.target;
    
    if (draggedWord === target.dataset.word) {
        target.innerHTML = `<b>${target.innerText}</b>`;
        target.style.backgroundColor = "lightgreen";
        document.querySelector(`.draggable[data-word='${draggedWord}']`).remove();
        checkCompletion();
    }
}

function checkCompletion() {
    if (document.querySelectorAll(".draggable").length === 0) {
        document.getElementById("result").innerText = "모든 단어를 맞췄습니다!";
    }
}

setupGame();
