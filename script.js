// alert('Hello')
var notyf = new Notyf();
let now_turn = 'x';

// first target all cells
// first convert the html collection to array
const allcells = Array.from(document.getElementById('board_b').children);
const turn_text = document.getElementById('turn');

// this is a restart button
const restart = document.querySelector('.head_restart');

// This is a 2D array for checking the winning patter 
// when a user click on the cell

const pattern = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[2,4,6],[6,7,8]];


const start = () =>{
    now_turn = 'x';
    allcells.forEach((ele)=>{
        ele.classList.remove('x');
        ele.classList.remove('o');
        ele.innerHTML = '';
        ele.addEventListener('click',handleClick,{once:true});
    })
}



const fillCell = (e) => {
    if(now_turn === 'x'){
        e.className += ' x'
        e.innerHTML = 'x';
    }else{
        e.className += ' o'
        e.innerHTML = 'o';
    }
}

// for checking the match is win or not every time
const checkwin = (now) => {
    return pattern.some(group=>{
        return group.every(idx=>{
            return allcells[idx].innerHTML === now
        })
    })
}


// for checking the match is draw or not
const checkDraw = () => {
    return allcells.every(ele => ele.innerHTML !== '')   
}

// for removing the listener
const removeEvent = () => {
    allcells.forEach((ele)=>{
        ele.removeEventListener('click',handleClick);
    })
}


// handelig the clicks
const handleClick = (e) => {
    fillCell(e.target);
    if(checkDraw()){
        removeEvent(); 
        notyf.error('Match Drawn Restart Again');
    }
    else if(checkwin(now_turn)){
        removeEvent();
        notyf.success(`${now_turn} has won the game`);
    }else{
        let color = ''
        if(now_turn === 'x'){
            now_turn = 'o'
            color = '#FEDB39'
        }
        else{
            now_turn = 'x';
            color = '#1CD6CE'
        } 
        turn_text.innerHTML = now_turn;
        turn_text.style.color = color;
    }
}



restart.addEventListener('click',start);
start();
