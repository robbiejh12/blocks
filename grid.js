function Grid(x,y) {
	this.x = x; //right
	this.y = y; //down
	this.cells = this.empty();
	fillNewGrid(this);
};

Grid.prototype.empty = function(){
	var cells = [];
	for (var i = 0; i < this.x; i++) {
		var col = cells[i] = [];
		for (var j = 0; j < this.y; j++) {
			var block = new Block(false);
			col.push(block);
		};
	cells[i].push(col);
	};
	return cells;
};

fillNewGrid = function(id) {
	for (var i = 0; i < id.x; i++) {
		if (i == 0) {
			id.cells[i][0] = new Block(true);
		}
		else {
			do {
				id.cells[i][0] = new Block(true);
			}
			while (id.cells[i][0].points == id.cells[i-1][id.y-1].points);
		};
		id.dropBlock(i, 0);
	};
};

Grid.prototype.addBlock = function() {
	if (!hasWon) {
	var i = Math.floor(this.x/2);
	if (this.cells[i][0].isAvailable) {
		this.cells[i][0] = new Block (true);
		this.dropBlock(i, 0);
	}
	else {
	console.log('LOSE');
	};
	searchForMatches();
	};
};

Grid.prototype.dropBlock = function(i, yPos) {
	if (yPos+1 < this.y) {
		while (this.cells[i][yPos+1].isAvailable) {
			this.cells[i][yPos+1] = this.cells[i][yPos];
			this.cells[i][yPos] = new Block (false);
			yPos++;
		};
	};
};