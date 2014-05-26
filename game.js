function startGame (){
	window.hasWon = false;
	window.totalPoints = 0;
	window.savedPoints = 0;
	window.points = [1,2,5,10,20];
	setUpPointsArray();
	window.grid = new Grid (5,5);
	refreshGrid();
	document.getElementById('start-button').style.visibility = 'hidden';
	document.getElementById('pre-game-message').style.display = 'none';
};

setUpPointsArray = function() {
	points.sort(function(a,b){return a-b});
	var weights = Array.prototype.slice.call(points);
	weights.reverse();
	window.weightedPointsArray = [];
	for (var i = 0; i < weights.length; i++) {
		for (var j = 0; j < weights[i]; j++) {
			weightedPointsArray.push(points[i]);
		}
	};
};

document.onkeydown = function() {
    switch (window.event.keyCode) {
        case 37:
            horizontalMove('left');
            break;
        case 38:
            verticalMove('up');
            break;
        case 39:
            horizontalMove('right');
            break;
        case 40:
            verticalMove('down');
            break;
        case 16:
        	grid.addBlock();
        	break;
        default:
        	break;
    }
};

horizontalMove = function(direction) {
	var cellsArrayAfterMove = [];
	if (direction == 'left') {
		for (var i = 1; i < grid.x; i++){
			cellsArrayAfterMove.push(grid.cells[i]);
		};
		cellsArrayAfterMove.push(grid.cells[0]);
	}
	else if (direction == 'right') {
		cellsArrayAfterMove.push(grid.cells[grid.x-1]);
		for (var i = 0; i < (grid.x - 1); i++){
			cellsArrayAfterMove.push(grid.cells[i]);
		};
	}
	else {
		return;
	};
	grid.cells = cellsArrayAfterMove;
	totalPoints -= 1;
	refreshGrid();
};

verticalMove = function(direction) {
	var i = (grid.x-1)/2; //center column
	if (direction == 'down') {
		for (var j = 0; j < grid.y; j++) {
			if (!grid.cells[i][j].isAvailable) {
				var keepCell = grid.cells[i][grid.y-1];
				for (var k = grid.y-1 ; k > j; k--) {
					grid.cells[i][k] = grid.cells[i][k-1];
				}
				grid.cells[i][j] = keepCell;
				break;
			};
		};
	};
	if (direction == 'up') {
		for (var j = 0; j < grid.y; j++) {
			if (!grid.cells[i][j].isAvailable) {
				var keepCell = grid.cells[i][j];
				for (var k = j; k < (grid.y-1); k++) {
					grid.cells[i][k] = grid.cells[i][k+1];
				}
				grid.cells[i][grid.y-1] = keepCell;
				break;
			};
		};
	};
	searchForMatches();
};

searchForMatches = function() {
	for (var j = 0; j < grid.y; j++) { //for every row
		for (var i = 0; i < grid.x; i++) { //for every column
			var pointsValue = grid.cells[i][j].points;
			if (pointsValue !== null && !grid.cells[i][j].isMatched) { //for points not null or already matched
				var numberOfMatches = 1;
				for (var k = i+1; k<grid.x; k++) {
					if (grid.cells[k][j].points !== pointsValue) break;
					numberOfMatches++;
					if (numberOfMatches > 2) {
//						console.log('Match of ' + numberOfMatches + ' ' + pointsValue + 's Found Ending ' + k + ',' + j);
						grid.cells[k][j].isMatched = true;
						grid.cells[k-1][j].isMatched = true;
						grid.cells[k-2][j].isMatched = true;
					};
				};
			};
		};
	};
	removeMatchedBlocks();
};

removeMatchedBlocks = function() {
	for (var i = 0; i < grid.x; i++) {
		for (var j = 0; j < grid.y; j++) {
			if (grid.cells[i][j].isMatched) {
				totalPoints += grid.cells[i][j].points;
				grid.cells[i][j] = new Block(false);
			};
		};
	};
	for (var i = grid.x-1; i > -1; i--) {
		for (var j = grid.y-1; j > -1; j--) {
			grid.dropBlock(i, j);
		};
	};
	checkForNoMoreOfPoint();
};

checkForNoMoreOfPoint = function() {
	var presentPoints = [];
	for (var i = 0; i < grid.x; i++) {
		for (var j = 0; j < grid.y; j++) {
			if (grid.cells[i][j].hasValue) {
				if (presentPoints.indexOf(grid.cells[i][j].points) < 0) {
					presentPoints.push(grid.cells[i][j].points);
				};
			};
		};
	};
	console.log(presentPoints);
	points = presentPoints;
	setUpPointsArray();
	checkIfWon();
};

checkIfWon = function() {
	hasWon = true;
	outerLoop:
	for (var i = 0; i < grid.x; i++) {
		for (var j = 0; j < grid.y; j++) {
			if (grid.cells[i][j].hasValue) {
				hasWon = false;
				break outerLoop;
			};
		};
	};
	if (hasWon) console.log('WON');
	refreshGrid();
};