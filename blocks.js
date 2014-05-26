function Block(hasValue) {
	this.hasValue = hasValue;
	this.points = this.getPoints();
	this.color = this.getBlockColor();
	this.isAvailable = !hasValue;
	this.isMatched = false;
};

Block.prototype.getPoints = function() {
	if (this.hasValue) {
		do {
			var index = Math.floor(Math.random() * weightedPointsArray.length);
			var points = weightedPointsArray[index];
		}
		while (points == savedPoints);
	}
	else {
		points = null;
	};
	savedPoints = points;
	return points;
};

Block.prototype.getBlockColor = function() {
	var color = "";
	switch (this.points) {
		case null:
			color = "black";
			break;
		case 1:
			color = "white";
			break;
		case 2:
			color = "blue";
			break;
		case 5:
			color = "red";
			break;
		case 10:
			color = "silver";
			break;
		case 20:
			color = "gold";
			break;
		default:
			break;
	}
	return color;
};

Block.prototype.getAvailability = function() {
	if (this.points == null){
		return true;
	};
};