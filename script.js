   const words = [
            { word: "chatgpt", meaning: "대화형 인공지능으로 사람과 자연스러운 대화를 할 수 있도록 설계된 모델" },
            { word: "드론", meaning: "원격으로 조종할 수 있는 비행 장치로, 촬영, 물품 배송 등에 사용됨." },
            { word: "인공지능", meaning: "인간처럼 사고하고 학습할 수 있는 컴퓨터 시스템." },
            { word: "사물인터넷", meaning: "일상적인 물건들이 인터넷을 통해 연결되어 상호작용하는 기술 (스마트홈 등)" },
            { word: "가상현실(VR)", meaning: "컴퓨터로 생성한 가상의 환경을 체험할 수 있는 기술" },
            { word: "증강현실(AR)", meaning: "현실세계에 가상 객체를 추가하여 보여주는 기술" },
            { word: "클라우드컴퓨팅", meaning: "데이터를 인터넷을 통해 저장하고 처리하는 기술" },
            { word: "빅데이터", meaning: "매우 큰 데이터를 처리하고, 분석하는 기술" },
            { word: "5G", meaning: "차세대 이동통신 기술로, 고속의 데이터 전송과 낮은 지연시간을 제공하는 것" },
            { word: "자율주행차", meaning: "운전자의 개입없이 스스로 주행할 수 있는 차량" },
            { word: "숏폼", meaning: "유튜브, 틱톡, 인스타그램에서 많이 사용하는 짧은 영상 콘텐츠를 뜻하는 말" },
            { word: "백신", meaning: "컴퓨터나 스마트폰이 바이러스에 감염되지 않도록 보호하는 프로그램" },
            { word: "알고리즘", meaning: "SNS, 뉴스, 영상 등에서 자동으로 추천 콘텐츠를 보여주는 시스템" },
            { word: "저작권", meaning: "인터넷에서 다른 사람의 아이디어나 창작물을 무단으로 사용하는 것을 막기 위해 존재하는 것" },
            { word: "해커", meaning: "컴퓨터나 네트워크 시스템을 공격하여 정보를 훔치거나 피해를 주는 사람" },
            { word: "로봇", meaning: "자동으로 동작하는 기계로, 작업을 수행하거나 사람을 돕는 장치." }
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
                wordDiv.addEventListener("touchstart", touchStart);
                wordDiv.addEventListener("touchmove", touchMove);
                wordDiv.addEventListener("touchend", touchEnd);
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
            handleDrop(draggedWord, event.target);
        }

        function touchStart(event) {
            event.target.classList.add("dragging");
        }

        function touchMove(event) {
            event.preventDefault();
            let touch = event.touches[0];
            let element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains("droppable")) {
                event.target.dataset.target = element.dataset.word;
            }
        }

        function touchEnd(event) {
            let targetWord = event.target.dataset.target;
            if (targetWord) {
                let targetElement = document.querySelector(`.droppable[data-word='${targetWord}']`);
                handleDrop(event.target.dataset.word, targetElement);
            }
            event.target.classList.remove("dragging");
        }

        function handleDrop(word, target) {
            if (word === target.dataset.word) {
                target.innerHTML = `<b>${target.innerText}</b>`;
                // target.style.backgroundColor = "lightgreen";
                document.querySelector(`.draggable[data-word='${word}']`).remove();
                       // 서서히 사라지는 애니메이션 효과 적용
            target.style.transition = "opacity 0.5s ease";
            target.style.opacity = "0"; // 투명하게 만들기
            setTimeout(() => {
                target.remove(); // 뜻 제거
                checkCompletion(); // 게임 완료 여부 확인
            }, 500); // 100ms(0.5초) 후 실행

            // 효과음 재생
                const successSound = document.getElementById("success-sound");
                successSound.play(); // 정답 맞췄을 때 효과음 재생
                checkCompletion();
            }
           else
            {
               const failureSound = document.getElementById("failure-sound");
                failureSound.play(); // 정답 맞췄을 때 효과음 재생
            }
        }

        function checkCompletion() {
            if (document.querySelectorAll(".draggable").length === 0) {
                document.getElementById("result").innerText = "모든 단어를 맞췄습니다!";
            }
        }
        
        setupGame();
