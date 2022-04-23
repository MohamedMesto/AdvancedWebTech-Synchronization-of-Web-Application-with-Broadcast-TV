document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function(){

        let videoUrl = "https://rbbmediapmdp-a.akamaihd.net/content/a8/4d/a84deeb0-9794-47f2-b600-a08749e8cde7/e183f416-a41c-4102-a03b-d630ce3373b6_1800k.mp4";
        setVideoURL(videoUrl);
        createTimerVideoTemplate();
        createTimerVideo();
        createScoreTemplate();
        navigateButtons();
        chooseAnswer();   
    }, 1850);
});


let t = 0,
    cost = 0,
    score = 0,
    hours = 0, 
    seconds = 0,
    minutes = 0, 
    btnIndex = 0,
    btnsList = null,
    selected = false,
    correctAns = null,
    is_correct = false,
    selectedAns = null,
    questionRowIndex = null,
    questionStyleRowIndex = null;

function setVideoURL (videoUrl) {
    let vidObject = document.getElementsByClassName("video-wrapper")[0].firstChild;
    vidObject.data = videoUrl;
}


function createScoreTemplate() {
    let mainDiv = document.createElement("div"),
        child4p = document.createElement("span"),
        child1Div = document.createElement("div"),
        child2Div = document.createElement("div"),
        child3Div = document.createElement("div"),
        mainContainer = document.getElementsByClassName("page-elements-container")[0];
    
    mainDiv.style.left = "50px" 
    mainDiv.style.top = "40px";
    child1Div.style.top = "0px";
    child1Div.style.left = "0px";
    mainDiv.id = "scoreTemplate";
    mainDiv.style.width = "150px";
    mainDiv.style.height = "36px";
    mainDiv.style.zIndex = "1000";
    mainDiv.style.color = "white";
    child4p.style.margin = "10px";
    child1Div.style.width = "0px";
    child3Div.appendChild(child4p);
    child1Div.style.height = "0px";
    mainDiv.appendChild(child1Div);
    mainDiv.style.fontSize = "24px";
    child2Div.appendChild(child3Div);
    child1Div.appendChild(child2Div);
    mainDiv.style.fontWeight = "bold";
    mainContainer.appendChild(mainDiv);
    mainDiv.style.background = "#106b17";
    child1Div.style.position = "absolute";
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("text-content");
    child2Div.classList.add("text-content");
    child3Div.classList.add("not-scrolling");
    child4p.textContent = "Score:\u00a0" + score;
    child2Div.classList.add("page-element-content");
}


function createToggleTrackingButtonTemplate(id, bgColor, txt, btnWidth, btnHeight, bColor, bRadius, bWidth, fColor, padding, pTop, pLeft, fSize) {
    let mainDiv = document.createElement("div"),
        child1Div = document.createElement("div"),
        child2Div = document.createElement("div"),
        child5Span = document.createElement("h5"),
        mainContainer = document.getElementsByClassName("page-elements-container")[0];
    
    if(! selected) mainDiv.style.backgroundColor = bgColor;
    
    mainDiv.id = id;
    mainDiv.style.top = pTop;
    mainDiv.style.left = pLeft;
    child5Span.innerText = txt;
    child1Div.style.top = "0px";
    child1Div.style.left = "0px";
    child1Div.style.width = "0px";
    mainDiv.style.zIndex = "1000";
    child1Div.style.height = "0px";
    mainDiv.style.width = btnWidth;
    mainDiv.appendChild(child1Div);
    mainDiv.style.border = "solid";
    mainDiv.style.display = "block";
    child5Span.style.color = fColor;
    child1Div.appendChild(child2Div);
    mainDiv.style.height = btnHeight;
    child2Div.appendChild(child5Span);
    child5Span.style.fontSize = fSize;
    mainContainer.appendChild(mainDiv);
    mainDiv.style.borderWidth = bWidth;
    mainDiv.style.borderColor = bColor;
    child5Span.style.display = "block";
    child5Span.style.marginTop = "5px";
    child5Span.style.marginLeft = "25px";
    child2Div.style.textAlign = "center";
    mainDiv.style.borderRadius = bRadius;
    child1Div.style.position = "absolute";
    mainDiv.classList.add("page-element");
    child2Div.classList.add("page-element-content");
    mainDiv.classList.add("toggletracking-component");
    child2Div.classList.add("toggle-tracking-content");
}


function createTimerTemplate() {
    let timerDiv = document.createElement("div"),
        timerElement = document.createElement("p"),
        mainContainer = document.getElementsByClassName("page-elements-container")[0];
    
    timerElement.id = "timer";
    timerElement.style.zIndex = "1000";
    timerElement.style.color = "white";
    timerDiv.appendChild(timerElement);
    mainContainer.appendChild(timerDiv); 
    timerElement.style.position = "relative";
}


function createTimerVideo() {
    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        document.getElementById("videoTimer").textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        document.getElementById("videoTimer").style.color = "white";
        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
        compareStartTime();
        // compareEndTime();
    }
    timer();
}


function createTimerVideoTemplate() {
    let child4h = document.createElement("h2"),
        mainDiv = document.createElement("div"),
        child1Div = document.createElement("div"),
        child2Div = document.createElement("div"),
        child3Div = document.createElement("div"),
        child5Time = document.createElement("time"),
        mainContainer = document.getElementsByClassName("page-elements-container")[0];
    
    child4h.id = "videoTimer";
    mainDiv.style.top = "80px";
    mainDiv.style.left = "50px" 
    child1Div.style.top = "0px";
    child1Div.style.left = "0px";
    child1Div.style.width = "0px";
    mainDiv.style.height = "40px";
    mainDiv.style.width = "100px";
    mainDiv.style.zIndex = "1000";
    child3Div.appendChild(child4h);
    mainDiv.appendChild(child1Div);
    child1Div.style.height = "0px";
    child4h.appendChild(child5Time);
    child2Div.appendChild(child3Div);
    child1Div.appendChild(child2Div);
    child5Time.style.color = "white";
    child5Time.innerText = "00:00:00";
    mainContainer.appendChild(mainDiv);
    child1Div.style.position = "absolute";
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("text-content");
    child2Div.classList.add("text-content");
    child3Div.classList.add("not-scrolling");
    child2Div.classList.add("page-element-content");
}


function createTimer() {
    let countDownDate = new Date("Dec 13, 2018 13:30:00").getTime();

    let x = setInterval(function() {
        let now = new Date().getTime(),
            distance = countDownDate - now,
            days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}


function createVideoTemplate(url) {
    let mainDiv = document.createElement("div"),
        child1Div = document.createElement("div"),
        child2Div = document.createElement("div"),
        child3Div = document.createElement("div"),
        child4Div = document.createElement("div"),
        child5Div = document.createElement("object"),
        mainContainer = document.getElementsByClassName("page-elements-container")[0];
    
    child5Div.data = url;
    child1Div.style.top = "0px";
    child1Div.style.left = "0px";
    child5Div.type = "video/mp4";
    child1Div.style.width = "0px";
    child1Div.style.height = "0px";
    mainDiv.appendChild(child1Div);
    child3Div.style.width = "100%";
    child3Div.style.height = "100#";
    child4Div.appendChild(child5Div);
    child3Div.appendChild(child4Div);
    child2Div.appendChild(child3Div);
    child1Div.appendChild(child2Div);
    child3Div.style.display = "block";
    mainContainer.appendChild(mainDiv);
    child3Div.style.overflow = "hidden";
    mainDiv.classList.add("page-element");
    child2Div.classList.add("fullscreen");
    child3Div.style.position = "absolute";
    child1Div.style.position = "absolute";
    mainDiv.classList.add("video-component");
    child2Div.classList.add("video-content");
    child4Div.classList.add("video-wrapper");
    child2Div.classList.add("page-element-content");
}


function compareStartTime() {
    questionsTable.questionsRows.forEach(function(v1, i1) {		
        if (v1.start_time_minute == minutes && v1.start_time_second == seconds) {
            cost = v1.cost;
            questionRowIndex = i1;
            let questionNumOfAns = v1.number_of_answers;
            questionStyleTable.questionStyleRows.forEach(function(v2, i2) {
                if (v2.number_of_answers == questionNumOfAns) {
                    questionStyleRowIndex = i2;
                    createToggleTrackingButtonTemplate(
                        "btn_id"+i2, 
                        v2.background_color, 
                        v2.button_text, 
                        v2.button_width, 
                        v2.button_height, 
                        v2.border_color, 
                        v2.border_radius, 
                        v2.border_width, 
                        v2.font_color, 
                        v2.padding, 
                        v2.position_top, 
                        v2.position_left, 
                        v2.font_size
                    );
                }
            });
            btnsList = document.getElementsByClassName("toggletracking-component");
        }
    });
    compareEndTime();
}


function compareEndTime() {
    if (document.getElementsByClassName("toggletracking-component").length > 0) {
        let end_time_minute = questionsTable.questionsRows[questionRowIndex].end_time_minute;
        let end_time_second = questionsTable.questionsRows[questionRowIndex].end_time_second;
        if (end_time_minute == minutes && end_time_second == seconds) {
            console.log("questionRowID >> ", questionRowIndex);
            if (checkAnswer(questionRowIndex)) {
                document.getElementById("scoreTemplate").remove();
                console.log("True Answer!");
                score = score + parseInt(cost,10);
                createScoreTemplate();
                
            } else {
                console.log("Wrong Answer!");
            }
            selected = false;
            for (let i = 0; i < 3; i++) {
                if (document.getElementById("btn_id"+i)) {
                    document.getElementById("btn_id"+i).remove();
                }
            }
            btnsList = [];
            btnIndex = null;
            is_correct = false;
            selectedAns = null;
            correctAns = null;
            questionRowIndex = null;
        }    
    }
}


function navigateButtons() {
    document.addEventListener('keyup', function(e) {
        btnUp: if (e.keyCode == 38) {
            if (btnIndex == 0)
                break btnUp;
            btnIndex--;
        }
        btnDown: if (e.keyCode == 40) {
            if (btnIndex >= btnsList.length-1)
                break btnDown;
            btnIndex++;
        }
        for (let i = 0; i < btnsList.length; i++) {
            btnsList[i].blur();
            if (btnsList[i].classList.contains("btnActive")) {
                btnsList[i].classList.remove("btnActive");   
                btnsList[i].style.borderColor = questionStyleTable.questionStyleRows[questionStyleRowIndex].border_color; 
            }
        }
        btnsList[btnIndex].focus();
        btnsList[btnIndex].style.borderColor = "yellow";
        btnsList[btnIndex].classList.add("btnActive");
    }); 
}


function chooseAnswer() {
    document.addEventListener('keyup', function (e) {
        let checkbtnStatus = true;

        if (e.keyCode == 13) {
            for (let i = 0; i < btnsList.length; i++) {

                if (btnsList[i].classList.contains("btnSelected")) {
                    checkbtnStatus = false;                    
                    break;
                }
            }
            if(checkbtnStatus){
                btnsList[btnIndex].style.backgroundColor = "#e28412";
                btnsList[btnIndex].classList.add("btnSelected");
                selected = true;
            }
        }
    })
}


function checkAnswer(index) {
    is_correct = false;
    correctAns = questionsTable.questionsRows[index].correct_ans;
    
    for (let i = 0; i < btnsList.length; i++) {
        if (btnsList[btnIndex] == btnsList[0]) selectedAns = "A";
        else if (btnsList[btnIndex] == btnsList[1]) selectedAns = "B";
        else if (btnsList[btnIndex] == btnsList[2]) selectedAns = "C";
    }

    if (correctAns == selectedAns) is_correct = true;
    
    return is_correct;
}
