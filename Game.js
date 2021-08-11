/** @type {HTMLCanvasElement} */

var GaneInterval
var BLOCK_SIZE = 20;
var BLOCK_COUNT = 20;
var Snack;
var Apple;
var Score = 0;
//遊戲開始
function GameStar(){
    document.getElementById('Over').innerHTML = "得分: ";
    document.getElementById('Point').innerHTML = "0";
    Snack = {
        body : [
            {
                x:BLOCK_COUNT/2 , y:BLOCK_COUNT/2
            }
        ],
        size : 3,
        direction : {
            x:0, y:-1
        }
    }
    PutApple();
    GaneInterval  = setInterval(GameRoutine,100);//每1毫秒Update一次
    
}

function GameRoutine(){
    update();
    move();
    if (SnackIsDead()) {
        GameOver();
        return
    }
    if(Snack.body[0].x == Apple.x && Snack.body[0].y == Apple.y){
        EatApple();
    }
}

function PutApple(){
    Apple = {
        x : Math.floor(Math.random() * BLOCK_COUNT),
        y : Math.floor(Math.random() * BLOCK_COUNT),
    }
    for(var i=0;i<Snack.body.length;i++){
        if(Snack.body[i].x == Apple.x && Snack.body[i].y == Apple.y){
            PutApple();
        }
    }   
}

function EatApple(){
    Score +=1;
    document.getElementById('Point').textContent = Score+"";
    Snack.size +=1;
    PutApple();
}

//更新畫布
function update(){
    var canvas = document.getElementById('Canvas');
    var context = canvas.getContext('2d');
    //畫格子
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    //畫蛇
    context.fillStyle = 'lime';
    for(var i=0;i<Snack.body.length;i++){
        context.fillRect(
            Snack.body[i].x * BLOCK_SIZE + 1,
            Snack.body[i].y * BLOCK_SIZE + 1,
            BLOCK_SIZE - 1,
            BLOCK_SIZE - 1
        )
    }

    context.fillStyle = 'red';
    context.fillRect(
        Apple.x * BLOCK_SIZE +1,
        Apple.y * BLOCK_SIZE +1,
        BLOCK_SIZE -1,
        BLOCK_SIZE -1
    )
}

function move(){
    //新的格子
    var newBlock = {
        x: Snack.body[0].x + Snack.direction.x,
        y: Snack.body[0].y + Snack.direction.y
    }
    //加入Body後再把多的Pop出去
    Snack.body.unshift(newBlock);
    while(Snack.body.length > Snack.size){
        Snack.body.pop();
}

//讀取按鍵
window.addEventListener('keydown',function(event){

    if(event.keyCode === 37){ //左方向鍵
        Snack.direction.x  = -1;
        Snack.direction.y = 0;
    }
    else if(event.keyCode === 39){ //右方向鍵
        Snack.direction.x  = 1;
        Snack.direction.y = 0;
    }
    else if(event.keyCode === 40){ //下方向鍵
        Snack.direction.x  = 0;
        Snack.direction.y = 1;
    }
    else if(event.keyCode === 38){ //上方向鍵
        Snack.direction.x  = 0;
        Snack.direction.y = -1;
    }
})
}

function SnackIsDead() {
    // hit walls
    if (Snack.body[0].x < 0) {
      return true
    } else if (Snack.body[0].x >= BLOCK_COUNT) {
      return true
    } else if (Snack.body[0].y < 0) {
      return true
    } else if (Snack.body[0].y >= BLOCK_COUNT) {
      return true
    }
    
    // hit body
    for (var i=1; i<Snack.body.length; i++) {
      if (Snack.body[0].x === Snack.body[i].x &&
          Snack.body[0].y === Snack.body[i].y) {
        return true
      }
    }
    return false
}

function GameOver(){
    clearInterval(GaneInterval);
    document.getElementById('Over').textContent = "GAME OVER";
    document.getElementById('Point').innerHTML = "";
}