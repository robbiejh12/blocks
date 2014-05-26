constructGrid = function() {
	for (j = 0; j < grid.y; j++) {
		var gridRow = document.createElement('div')
		gridRow.className = "grid-row";
		for (var i = 0; i < grid.x; i++) {
			var p = document.createTextNode(grid.cells[i][j].points);
			var gridBlock = document.createElement('div')
			if (grid.cells[i][j].points == null) {
				gridBlock.style.color = 'black';
			};
			gridBlock.className = 'grid-block';
			gridBlock.style.backgroundImage = '-webkit-radial-gradient(black, ' + grid.cells[i][j].color + ', black';
			if (i == (grid.x-1)/2) {
				gridBlock.style.border = 'solid 2px red';
			};
			gridBlock.appendChild(p);
			gridRow.appendChild(gridBlock);
		};
		document.getElementById('game-grid').appendChild(gridRow);
	};
};

eraseGrid = function() {
	var gridNode = document.getElementById('game-grid');
	while (gridNode.firstChild) {
    	gridNode.removeChild(gridNode.firstChild);
	}
};

updateScore = function() {
	document.getElementById('score-counter').innerHTML = 'Score: ' + totalPoints;
};

refreshGrid = function() {
	eraseGrid();
	constructGrid();
	updateScore();
};