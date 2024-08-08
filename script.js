let bulletSpeed = 5;
let powers = [
    "rgb(255, 0, 204)",
    "rgb(0, 119, 255)",
    "rgb(255, 234, 0)",
    "rgb(0, 255, 60)",
    "red",
];
let power = 0;
let score = 0;
let players=1;
// getNewGun
function getNewGun(top, left, color) {
    const gunGiftContainer = document.createElement("div");
    gunGiftContainer.setAttribute("class", "new-gun-container");

    const gunTop = document.createElement("div");
    gunTop.setAttribute("class", "gun-top");
    gunTop.style.backgroundColor = color;

    const gunFoot = document.createElement("div");
    gunFoot.setAttribute("class", "gun-foot");
    gunFoot.style.backgroundColor = color;

    gunGiftContainer.appendChild(gunTop);
    gunGiftContainer.appendChild(gunFoot);

    gunGiftContainer.style.setProperty("--top", top + "px");
    gunGiftContainer.style.setProperty("--left", left + "px");

    gunGiftContainer.style.setProperty("--top30", top - 3 + "px");
    gunGiftContainer.style.setProperty("--left30", left + 3 + "px");
    const player = document.querySelector(".player-gun-container");

    gunGiftContainer.style.setProperty(
        "--left100",
        player.getBoundingClientRect().left + "px"
    );
    document.body.appendChild(gunGiftContainer);
    setTimeout(() => {
        document.body.removeChild(gunGiftContainer);
    }, 2000);
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function generatePlayers(players){
    let color = document.body.querySelector('.player-gun-top')?.style?.backgroundColor;
    const playerguncontainer =document.querySelector('.player-gun-container');
   let top= playerguncontainer.style.top;
   let left = playerguncontainer.style.left;
  
    
   const playerContainer = document.createElement('div');
   playerContainer.setAttribute('class',playerguncontainer.className);
   playerContainer.style.left=left;
   playerContainer.style.top=top;

    for(let k=0;k<players;k++){
   const playergunbox=document.createElement('div');
   playergunbox.setAttribute('class','player-gun-box');

   const playerguntop=document.createElement('div');
   playerguntop.setAttribute('class','player-gun-top');
   playerguntop.style.backgroundColor=color;

   const playergunfoot=document.createElement('div');
   playergunfoot.setAttribute('class','player-gun-foot');
   playergunfoot.style.backgroundColor=color;

   playergunbox.appendChild(playerguntop);
   playergunbox.appendChild(playergunfoot);

   playerContainer.appendChild(playergunbox);
    }
    playerguncontainer.replaceWith(playerContainer);



}
generatePlayers(players);

function addGunGift(position) {
    let color = getRandomColor();
    const gunGift = document.createElement("div");
    gunGift.setAttribute("class", "gun-gift");

    const gunGiftContainer = document.createElement("div");
    gunGiftContainer.setAttribute("class", "gun-gift-container");

    const gunTop = document.createElement("div");
    gunTop.setAttribute("class", "gun-top");
    gunTop.style.backgroundColor = color;

    const gunFoot = document.createElement("div");
    gunFoot.setAttribute("class", "gun-foot");
    gunFoot.style.backgroundColor = color;

    const points = document.createElement("div");
    points.setAttribute("class", "points");
    points.innerHTML = Math.floor((Math.random() * 2000/(bulletSpeed)) +1 );

    gunGiftContainer.appendChild(gunTop);
    gunGiftContainer.appendChild(gunFoot);

    gunGift.appendChild(gunGiftContainer);
    gunGift.appendChild(points);
    gunGift.style.left = position + "px";

    const box = document.createElement("div");
    box.setAttribute("class", "box");

    box.appendChild(gunGift);
    const gameZone = document.body.querySelector("#game-zone");
    gameZone.appendChild(box);
}

function addPlayerGift(position) {
    const box = document.createElement("div");
    box.setAttribute("class", "box");

    const playerGift = document.createElement("div");
    playerGift.setAttribute("class", "player-gift");

    const playerNo = document.createElement("div");
    playerNo.setAttribute("class", "players");
    if(players>3){
        playerNo.innerHTML = "-" + (Math.floor(Math.random() * 2) + 1);
    }
    else{
    if (Math.floor(Math.random() * 2) == 1) {
        playerNo.innerHTML = "+" + (Math.floor(Math.random() * 2) + 1);
    } else {
        playerNo.innerHTML = "-" + (Math.floor(Math.random() * 2) + 1);
    }
    }
    playerGift.appendChild(playerNo);
    playerGift.style.left = position + "px";

    box.appendChild(playerGift);
    const gameZone = document.body.querySelector("#game-zone");
    gameZone.appendChild(box);
}

addGunGift(10);
addPlayerGift(150);

// for moving boxes down;
let interval1 = setInterval(() => {
    const boxes = document.querySelectorAll(".box");
    const player = document.querySelector(".player-gun-container");
    for (let i = 0; i < boxes.length; i++) {
        if (
            boxes[i].getBoundingClientRect().top >= 430 &&
            boxes[i].childNodes[0].style.left == "10px" &&
            boxes[i].childNodes[0].className == "player-gift" &&
            player.childNodes[0].getBoundingClientRect().left >=9 &&
            player.getBoundingClientRect().left <= 120
        ) {
            players=players+parseInt(boxes[i].childNodes[0].childNodes[0].innerHTML);
            generatePlayers(players);
            const gameZone = document.body.querySelector("#game-zone");
            gameZone.removeChild(boxes[i]);
            if(players<=0){
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(interval3);
                clearInterval(interval4);
                document.querySelector(".game-over").style.display = "block";
            }

        }
        else if (
            boxes[i].getBoundingClientRect().top >= 430 &&
            boxes[i].childNodes[0].style.left == "150px" &&
            boxes[i].childNodes[0].className == "player-gift" &&
            player.childNodes[(player.childNodes.length)>3?2:player.childNodes.length-1].getBoundingClientRect().left >= 120 &&
            player.getBoundingClientRect().left <= 300
            
        ) {
            players=players+parseInt(boxes[i].childNodes[0].childNodes[0].innerHTML);
            generatePlayers(players);
            const gameZone = document.body.querySelector("#game-zone");
            gameZone.removeChild(boxes[i]);
            if(players<=0){
                clearInterval(interval1);
                clearInterval(interval2);
                clearInterval(interval3);
                clearInterval(interval4);
                document.querySelector(".game-over").style.display = "block";
            }

        }
        else if (boxes[i].getBoundingClientRect().top >= 450) {
            const gameZone = document.body.querySelector("#game-zone");
            gameZone.removeChild(boxes[i]);
        }
        // else if(boxes[i].childNodes)
        else {
            boxes[i].style.top = boxes[i].getBoundingClientRect().top + 10 + "px";
            boxes[i].childNodes[0].style.top =
                boxes[i].getBoundingClientRect().top + 10 + "px";
        }
    }
}, 400);

// add multiple boxes in row
let interval2 = setInterval(() => {
    let random = Math.floor(Math.random() * 4);
    if (random == 0) {
        addGunGift(10);
        addPlayerGift(150);
    } else if (random == 1) {
        addPlayerGift(10);
        addGunGift(150);
    } else if (random == 2) {
        addPlayerGift(10);
        addPlayerGift(150);
    } else {
        addGunGift(10);
        addGunGift(150);
    }
}, 4000);

// bullet creation
let interval3 = setInterval(() => { 
for(let i=0;i<players;i++){
    const bullet = document.createElement("div");
    bullet.setAttribute("class", "bullet");
    const player = document.querySelector(".player-gun-container");
    bullet.style.left = (player.getBoundingClientRect().left+i*40) + "px";
    if(i>2){
        bullet.style.top = (480+10*i/1.1 ) + "px"; 
        bullet.style.left = (player.getBoundingClientRect().left+(i%3)*40) + "px";
    }
    if(power>4){
        bullet.style.backgroundColor = powers[4];
    }
    else{
        bullet.style.backgroundColor = powers[power];
    }
  
    document.body.appendChild(bullet);
}
}, 50 * bulletSpeed);


// move the bullet to up

let interval4 = setInterval(() => {
    const bullets = document.querySelectorAll(".bullet");
    const gunGift = document.querySelectorAll(".gun-gift");
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].getBoundingClientRect().top <= 10) {
            document.body.removeChild(bullets[i]);
        }
        // left Box
        else if (
            bullets[i].getBoundingClientRect().left >= 10 &&
            bullets[i].getBoundingClientRect().left <= 120
        ) {
            for (let k = 0; k < gunGift.length; k++) {
                if (
                    gunGift[k].getBoundingClientRect().left == 10 &&
                    gunGift[k].getBoundingClientRect().top >=
                    bullets[i].getBoundingClientRect().top - 10
                ) {
                    gunGift[k].childNodes[1].innerHTML -= (power+5);
                    document.body.removeChild(bullets[i]);
                    if (gunGift[k].childNodes[1].innerHTML < 1) {
                        gunGift[k].style.display = "none";
                        let color =
                            gunGift[k].childNodes[0].childNodes[1].style.backgroundColor;
                        getNewGun(
                            gunGift[k].style.top.substring(
                                0,
                                gunGift[k].style.top.length - 2
                            ),
                            gunGift[k].childNodes[1].getBoundingClientRect().left + 30,
                            color
                        );
                        let players = document.querySelectorAll('.player-gun-box');
                        for(let j=0;j<players.length;j++){
                            players[j].childNodes[0].style.backgroundColor=color;
                            players[j].childNodes[1].style.backgroundColor=color;
                        }
                        score += 10;
                        if (bulletSpeed > 1) {
                            bulletSpeed--;
                        }
                        if (power < 5) {
                            power++;
                        }
                        document.querySelector(".player-score").innerHTML = score;
                        document.querySelector(".player-power").innerHTML = power;
                    } else if (
                        parseInt(
                            gunGift[k].style.top.substring(0, gunGift[k].style.top.length - 2)
                        ) >= 440
                    ) {
                        clearInterval(interval1);
                        clearInterval(interval2);
                        clearInterval(interval3);
                        clearInterval(interval4);
                        document.querySelector(".game-over").style.display = "block";
                    }
                    break;
                } else if (k == gunGift.length - 1) {
                    bullets[i].style.top =
                        bullets[i].getBoundingClientRect().top - 10 + "px";
                }
            }
        }
        // check mid left
        else if( bullets[i].getBoundingClientRect().left >= 120 &&
                 bullets[i].getBoundingClientRect().left < 130){
            for (let k = 0; k < gunGift.length; k++) {
                if ( gunGift[k].getBoundingClientRect().left == 10 &&
                parseInt(gunGift[k].style.top.substring(0, gunGift[k].style.top.length - 2)) >= 440
                ) {
                        clearInterval(interval1);
                        clearInterval(interval2);
                        clearInterval(interval3);
                        clearInterval(interval4);
                        document.querySelector(".game-over").style.display = "block";
                }

            }
            bullets[i].style.top = bullets[i].getBoundingClientRect().top - 10 + "px";
        }
         // check mid right
         else if( bullets[i].getBoundingClientRect().left >= 130 &&
                  bullets[i].getBoundingClientRect().left < 140){
            for (let k = 0; k < gunGift.length; k++) {
                if ( gunGift[k].getBoundingClientRect().left == 150 &&
                parseInt(gunGift[k].style.top.substring(0, gunGift[k].style.top.length - 2)) >= 440
                ) {
                        clearInterval(interval1);
                        clearInterval(interval2);
                        clearInterval(interval3);
                        clearInterval(interval4);
                        document.querySelector(".game-over").style.display = "block";
                }

            }
            bullets[i].style.top = bullets[i].getBoundingClientRect().top - 10 + "px";
        }
        // right box
        else if (
            bullets[i].getBoundingClientRect().left >= 140 &&
            bullets[i].getBoundingClientRect().left <= 260
        ) {
            for (let k = 0; k < gunGift.length; k++) {
                if (
                    gunGift[k].getBoundingClientRect().left == 150 &&
                    gunGift[k].getBoundingClientRect().top >=
                    bullets[i].getBoundingClientRect().top - 10
                ) {
                    gunGift[k].childNodes[1].innerHTML -= (power+5);
                    document.body.removeChild(bullets[i]);
                    if (gunGift[k].childNodes[1].innerHTML < 1) {
                        gunGift[k].style.display = "none";
                        let color =
                        gunGift[k].childNodes[0].childNodes[1].style.backgroundColor;
                        getNewGun(
                            gunGift[k].style.top.substring(
                                0,
                                gunGift[k].style.top.length - 2
                            ),
                            180,color
                        );
                        let players = document.querySelectorAll('.player-gun-box');
                        for(let j=0;j<players.length;j++){
                            players[j].childNodes[0].style.backgroundColor=color;
                            players[j].childNodes[1].style.backgroundColor=color;
                        }
                        score += 10;
                        if (bulletSpeed > 1) {
                            bulletSpeed--;
                        }
                        if (power < 5) {
                            power++;
                        }
                        document.querySelector(".player-score").innerHTML = score;
                        document.querySelector(".player-power").innerHTML = power;
                    } else if (
                        parseInt(
                            gunGift[k].style.top.substring(0, gunGift[k].style.top.length - 2)
                        ) >= 440
                    ) {
                        clearInterval(interval1);
                        clearInterval(interval2);
                        clearInterval(interval3);
                        clearInterval(interval4);
                        document.querySelector(".game-over").style.display = "block";
                    }
                    break;
                } else if (k == gunGift.length - 1) {
                    bullets[i].style.top =
                        bullets[i].getBoundingClientRect().top - 10 + "px";
                }
            }
        } else {
            bullets[i].style.top = bullets[i].getBoundingClientRect().top - 10 + "px";
        }
        // }
    }
}, 5 * bulletSpeed);

// const player = document.querySelector('.player-gun-container');
// player.style.left=100+'px';

function moveLeft() {
   
    const player = document.querySelector(".player-gun-container");
    if(player.getBoundingClientRect().left>10){
    player.style.left = player.getBoundingClientRect().left - 10 + "px";
    }
}

const leftBtn = document.querySelector(".left-btn");
leftBtn.addEventListener("click", moveLeft);

function moveRight() {
    const player = document.querySelector(".player-gun-container");
    if(player.childNodes[(player.childNodes.length)>3?2:player.childNodes.length-1].getBoundingClientRect().left<230){
    player.style.left = player.getBoundingClientRect().left + 10 + "px";
    }
}

const rightBtn = document.querySelector(".right-btn");
rightBtn.addEventListener("click", moveRight);
document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
      moveRight();
    }
    if (e.key == "ArrowLeft") {
      moveLeft();
    }
  });