function random(min,max){
    let minNum = Math.floor(min);
    let maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}
function createElement(tagName){
    return document.createElement(tagName);
}
/* ----------------------------------------- Start Mohamed Farag ------------------------------------------- */
function createImg(position,source,ducks,color,level){
    let increase;
    let timeSpeed;
    if (level === "level-1"){
        increase = 10;
        timeSpeed = 100;
    }else{
        increase = 15;
        timeSpeed = 10;
    }
    let scrWidth = $(window).width();
    let duck = $('<img />', {
        id:color,
        class: `duck ${color} target fly`,
        src: `Images/${source}`,
    });
    if(position === 0){
        $(duck).css({
            "transform":"rotateY(180deg)",
            "left":"-200px",
            "top":random(0,parseInt($(ducks).height())-200) + "px",
        });
        let move = setInterval(function () {
            $(duck).css("left",`+=${increase}px`);
            if(parseInt($(duck).css("left")) > scrWidth){
                $(duck).remove();
                clearInterval(move);
            }
        },timeSpeed)
    }else {
        $(duck).css({
            "right":"-200px",
            "top":random(0,parseInt($(ducks).height())-200) + "px",
        });
        let move = setInterval(function () {
            $(duck).css("right",`+=${increase}px`);
            if(parseInt($(duck).css("right")) > scrWidth){
                $(duck).remove();
                clearInterval(move);
            }
        },timeSpeed)
    }
    $(duck).prependTo($(ducks));
}
/* ----------------------------------------- end Mohamed Farag ------------------------------------------- */
// start Ashraf
let makeBomb;
function bombInterval(ducks) {
    /* Bomb Code */
    let scrHeight = $(window).height();
    makeBomb = setInterval(function() {
        //Creation
        let img = $(
            `<img class="bomb target" style="left:${Math.random() * 1000}px">`
        );
        img.attr("src", "Images/bomb.png");
        img.appendTo(ducks);
        let move = setInterval(function() {
            //Move
            img.css("top", "+=1px");
            if(parseInt(img.css("top") + img.css("width")) > scrHeight){
                img.remove();
                clearInterval(move);
            }
        }, 1); //bombs

    }, 10000);
}
// end Ashraf
/* ----------------------------------------- Start Mohamed Farag ------------------------------------------- */
function interval(ducks,name,level){
    // Start Mohamed sabry elnagar
    let minute;
    let second;
    let speedCreate;
    if (level === "level-1"){
        minute = 1;
        second = 0;
        speedCreate = 1000
    }else{
        minute = 2;
        second = 0;
        speedCreate = 300;
    }
    // end Mohamed sabry elnagar
    let imgSource=["duckWhite.gif","duckBlack.gif","duckGold.gif"];
    let moveDucks = setInterval(function () {
        let position = random(0,1);
        let randomColor = random(0,2);
        switch(randomColor) {
            case 0:
                createImg(position,imgSource[0],ducks,"white",level);
                break;
            case 1:
                createImg(position,imgSource[1],ducks,"black",level);
                break;
            case 2:
                createImg(position,imgSource[2],ducks,"gold",level);
                break;
            default:
            // code block
        }
    },speedCreate);
    // Start Mohamed sabry elnagar
    let timers = setInterval(function () {
        second--;
        if(second >= 0){
            if(second < 10){
                if(minute < 10){
                    timer.innerText = `Timer 0${minute} : 0${second}`;
                }else {
                    timer.innerText = `Timer ${minute} : 0${second}`;
                }
            }else {
                if(minute < 10){
                    timer.innerText = `Timer 0${minute} : ${second}`;
                }else {
                    timer.innerText = `Timer ${minute} : ${second}`;
                }
            }
        }else {
            if(minute >= 0 && second < 0){
                minute--;
                second = 59;
                if(minute < 10){
                    timer.innerText = `Timer 0${minute} : ${second}`;
                }else {
                    timer.innerText = `Timer ${minute} : ${second}`;
                }
            }
        }
        if(minute <= 0 && second <= 0){
            console.log(minute+" : "+second);
            timer.innerText = `Timer 0${minute} : 0${second}`;
            clearInterval(timers);
            clearInterval(moveDucks);
            clearInterval(makeBomb);
            /* Start Ashraf */
            swal({
                title: "Do you want to play again?",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-primary",
                cancelButtonClass: "btn-danger",
                confirmButtonText: "Yes, play again",
                cancelButtonText: "No, back to menu",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal({
                        title: "Let's Play Again",
                        type: "success",
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                    },function (isConfirm) {
                        if(isConfirm){
                            interval(ducks,name,level);
                        }
                    });
                } else {
                    swal({
                        title: "See You Later " + name,
                        type: "warning",
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                    },function (isConfirm) {
                        if(isConfirm){
                            $("#backToMenu")[0].click();
                        }
                    });
                }
            });
            /* end Ashraf */
        }
    },1000);
    // End Mohamed sabry elnagar
}
/* ----------------------------------------- end Mohamed Farag ------------------------------------------- */
window.addEventListener("load",function () {
    // start Mohamed sabry elnagar
    let namePlayer = document.getElementById("namePlayer");
    let level = document.getElementById("level");
    let scoreText = document.getElementById("scoreText");
    let score = document.getElementById("score");
    let ducks = document.getElementById("ducks");
    let audio = document.getElementById("audio1");
    let audioExplosion = document.getElementById("audio2");
    let timer = document.getElementById("timer");
    let objStr = localStorage.getItem("player");
    let objStrPlayerName = localStorage.getItem("playerName");
    let objStrLevel = localStorage.getItem("level");
    let obj = JSON.parse(objStr);
    let search = obj.find(function (item) {
        return item.playerName === objStrPlayerName && item.level === objStrLevel;
    });
    ducks.style.width = ($(window).width()) + "px";
    ducks.style.height = ($(window).height() - 91) + "px";
    window.addEventListener("resize",function () {
        ducks.style.width = ($(window).width()) + "px";
        ducks.style.height = ($(window).height() - 91) + "px";
    });
    swal({
        title: "Do you want to continue to play?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-danger",
        confirmButtonText: "Yes, continue",
        cancelButtonText: "No, back to menu",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm) {
        if (isConfirm) {
            swal({
                title: "Welcome " + search.playerName,
                text: "Let's Play",
                type: "success",
                confirmButtonClass: "btn-primary",
                confirmButtonText: "OK",
                closeOnConfirm: true,
            },function (isConfirm) {
                if(isConfirm){
                    namePlayer.innerText = search.playerName;
                    level.innerText = search.level;
                    scoreText.innerText = "Score ";
                    score.innerText = search.score;
                    timer.innerText = "Timer 01 : 00";
                    interval(ducks,search.playerName,objStrLevel);
                    if(objStrLevel === "level-2"){
                        timer.innerText = "Timer 02 : 00";
                        bombInterval(ducks);
                    }
                }
            });
        } else {
            swal({
                title: "See You Later " + search.playerName,
                type: "warning",
                confirmButtonClass: "btn-primary",
                confirmButtonText: "OK",
                closeOnConfirm: true,
            },function (isConfirm) {
                if(isConfirm){
                    $("#backToMenu")[0].click();
                }
            });
        }
        // end Mohamed sabry elnagar
    });
/* ----------------------------------------- Start Mohamed Farag ------------------------------------------- */
    ducks.addEventListener("mousedown",function (e) {
        let target = e.target;
        // start Mohamed sabry elnagar
        audio.currentTime = 0;
        audio.play();
        // end Mohamed sabry elnagar
        if(target.classList[0] === "duck"){
            duckDie(target,score);
        // start Ashraf
        }else if(target.classList[0] === "bomb"){
            let ducks = $("img.duck");
            for (let i = 0; i < ducks.length; i++) {
                if(
                    parseInt($(ducks[i]).css("left")) + parseInt($(ducks[i]).css("width")) > parseInt($(target).css("left")) &&
                    parseInt($(ducks[i]).css("top")) + parseInt($(ducks[i]).css("height")) > parseInt($(target).css("top")) &&
                    parseInt($(ducks[i]).css("left")) < parseInt($(target).css("left")) + parseInt($(target).css("width")) &&
                    parseInt($(ducks[i]).css("top")) < parseInt($(target).css("top")) + parseInt($(target).css("height"))
                ){
                    duckDie(ducks[i],score);
                }
            }
            // start Mohamed sabry elnagar
            audioExplosion.currentTime = 0;
            audioExplosion.play();
            // end Mohamed sabry elnagar
            $(target).attr("src", "Images/fire.gif");
            $(target).addClass("bombAfter");
            setTimeout(function() {
                $(target).remove();
            }, 500);
        }
        // end Ashraf
        // start Mohamed sabry elnagar
        let objNew = {
            "playerName":namePlayer.innerText,
            "level":level.innerText,
            "score":score.innerText
        };
        let searchItem = obj.findIndex(function (item) {
            return item.playerName === objStrPlayerName && item.level === objStrLevel;
        });
        console.log(searchItem);
        obj[searchItem] = objNew;
        let objString = JSON.stringify(obj);
        localStorage.setItem("player",objString);
        // end Mohamed sabry elnagar
    });

});
function duckDie(ducks,score) {
    let heightScr = $(window).height();
    ducks.src = "Images/die.png";
    ducks.style.width = "200px";
    let die = setInterval(function () {
        $(ducks).css("top","+=10px");
        if(parseInt(ducks.style.top) > heightScr){
            $(ducks).remove();
            clearInterval(die);
        }
    },10);
    // start Mohamed sabry elnagar
    switch(ducks.classList[1]) {
        case "white":
            score.innerText = (parseInt(score.innerText) + 5);
            break;
        case "black":
            score.innerText = (parseInt(score.innerText) - 10);
            break;
        case "gold":
            score.innerText = (parseInt(score.innerText) + 10);
            break;
        default:
        // code block
    }
    // end Mohamed sabry elnagar
}
/* ----------------------------------------- End Mohamed Farag ------------------------------------------- */
