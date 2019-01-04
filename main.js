// Globals
var c = document.getElementById("can");
var ctx = c.getContext("2d");
var notice = document.querySelector("#notice");
var over = false;
var board = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
];
var playerTurn = true;

function makeBoard(){
	for(var i = 0; i < 3; i++) {
		let x = 200 + 200 * i;
		ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 600);
		ctx.stroke();

		ctx.moveTo(0, x);
		ctx.lineTo(600, x);
		ctx.stroke();
	}
}

makeBoard();

// drawing the shape after a click
function drawShape(l, x, y) {
	let cX, cY;
	// finding center x and y
	cX = 100 * (2*x + 1);
	cY = 100 * (2*y + 1);
	if (l == 'o') {
		ctx.beginPath();
        let startAngle = 0; // Starting point on circle
        let endAngle = 2 * Math.PI; // End point on circle
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 20;
        ctx.arc(cX, cY, 80, startAngle, endAngle, true);
        ctx.stroke();
	}
	else {
		let rad = 80;
		ctx.lineWidth = 20;
		ctx.strokeStyle = '#fff';

		ctx.moveTo(cX - rad, cY - rad);
		ctx.lineTo(cX + rad, cY + rad);
		ctx.stroke();

		ctx.moveTo(cX + rad, cY - rad);
		ctx.lineTo(cX - rad, cY + rad);
		ctx.stroke();		
	}
}

// function getIndex
function getIndex(x, y) {
	if (x < 0 || y < 0 || x > 600 || y > 600) {
		return false;
	}
	else {
		let xi, yi;

		for(let i = 0; i < 3; i++) {
			let curMax = (i + 1) * 200;
			if (x < curMax && x >= (curMax - 200))
				xi = i;
			if (y < curMax && y >= (curMax - 200))
				yi = i;
		}

		if (board[xi][yi] != -1)
			return false;
		else {
			let shape = 'o';
			if (!playerTurn)
				shape = 'x'
			board[xi][yi] = shape;
			drawShape(shape, xi, yi);
			return true;
		}
	}
}

function gamecheck() {
	// checking if any 3 rows has a winner
	for (let i = 0; i < 3; i++) 
		if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != -1)
			{	
				over = true;
				return board[i][0];
			}

	// checking if any 3 columns has a winner
	for (let i = 0; i < 3; i++) 
		if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != -1)
			{
				over = true;
				return board[0][i];
			}

	// checking main diagonal
	if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != -1)
			{
				over = true;
				return board[0][0];
			}

	// checking opp diagonal
	if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != -1)
		{
			over = true;	
			return board[1][1];
		}

	// checking if it is a draw
	for(let i = 0; i < 3; i++)
		for (let j = 0; j < 3; j++)
			if (board[i][j] == -1)
				return 'oops';
	
	over = true;
	return 'd'
}

// Getting
function getPos(event) {
	if (!over) {
		let rect = c.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		var valid = getIndex(x, y);
		// console.log(over);
		if (valid) {
			playerTurn = !playerTurn;
			let status = gamecheck();
			if (status == 'o') {
				setTimeout(function() {alert("The Player With o Won!!"); }, 500);
				notice.innerHTML = "The Player With o Won!!";
			}
			else if (status == 'x') {
				setTimeout(function() {alert("The Player With x Won!!"); }, 500);
				notice.innerHTML = "The Player With x Won!!";
			}
			else if (status == 'd'){
				setTimeout(function() {alert("DRAW!!"); }, 500);
				notice.innerHTML = "DRAW!!";
			}
		}
	}
}

function playAgain(event) {
	ctx.clearRect(0, 0, 600, 600);
	ctx.beginPath();
	makeBoard();

	board = [
  		[-1, -1, -1],
  		[-1, -1, -1],
  		[-1, -1, -1]
	];
	 playerTurn = true;
	 over = false;
 	notice.innerHTML = "Game In Progress";
}
