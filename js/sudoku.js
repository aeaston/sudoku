function Sudoku() {
	var boardGenerator = new BoardGenerator();
	var presetCells = boardGenerator.Generate();
	this.board = new Board(presetCells);

	// TODO need to add additional click handlers for updating cells
	this.ClearAll = function() {
		this.board.Reset();
		this.UpdateUI();
	};

	this.UpdateUI = function() {
		// TODO impliment this
	};

	this.DisplayVictory = function() {
		// TODO impliment this
	};

	this.UpdateUI();
}

function Board(presetCellInfo, size) {
	this.boardSize = size || 9;
	this.numFilled = 0;
	this.hasError = false;
	this.board = new Array(this.boardSize);
	for (var row = 0; row < this.boardSize; row++) {
		this.board[row] = new Array(this.boardSize);
		for (var col = 0; col < this.boardSize; col++) {
			this.board[row][col] = new Cell();
		}
	}

	for (var i in presetCellInfo) {
		this.board[presetCellInfo[i].GetRow() - 1][presetCellInfo[i].GetCol() - 1] = new Cell(presetCellInfo[i].GetVal(), true);
		this.numFilled++;
	}

	this.MarkCell = function(row, col, val) {
		var curCell = this.board[row][col];
		curCell.SetVal(val);
		// TODO: check if error was created here
	};

	this.ClearCell = function(row, col) {
		var curCell = this.board[row][col];
		if (curCell.GetVal() && !curCell.WasPreset()) {
			curCell.SetVal("");
			this.numFilled--;
			if (this.isError) {
				// TODO: need to check if error was corrected
			}
		}
	};

	this.Reset = function() {
		for (var row = 0; row < this.boardSize; row++) {
			for (var col = 0; col < this.boardSize; col++) {
				var curCell = this.board[row][col];
				if (!curCell.WasPreset) {
					curCell.ClearVal();
					this.numFilled--;
				}
			}
		}
	};

	this.IsSolved = function() {
		return !this.hasError && (this.numFilled === this.boardSize * this.boardSize);
	};
}

function Cell(val, preset) {
	this.value = val || "";
	this.preset = preset || false;

	this.GetVal = function() {
		return this.value;
	};

	this.SetVal = function(val) {
		this.value = val;
	};

	this.ClearVal = function() {
		this.value = "";
	};

	this.WasPreset = function() {
		return this.preset;
	};
}

function PresetCellInfo(row, col, val) {
	this.row = row;
	this.col = col;
	this.val = val;

	this.GetRow = function() {
		return this.row;
	};

	this.GetCol = function() {
		return this.col;
	};

	this.GetVal = function() {
		return this.val;
	};
}

function BoardGenerator() {
	this.Generate = function() {
		var presets = new Array();
		presets.push(new PresetCellInfo(1,1,5));
		presets.push(new PresetCellInfo(1,1,5));
		presets.push(new PresetCellInfo(1,2,3));
		presets.push(new PresetCellInfo(1,5,7));
		presets.push(new PresetCellInfo(2,4,1));
		presets.push(new PresetCellInfo(2,5,9));
		presets.push(new PresetCellInfo(2,6,5));
		presets.push(new PresetCellInfo(3,2,9));
		presets.push(new PresetCellInfo(3,3,8));
		presets.push(new PresetCellInfo(3,8,6));
		presets.push(new PresetCellInfo(4,1,8));
		presets.push(new PresetCellInfo(4,5,6));
		presets.push(new PresetCellInfo(4,9,3));
		presets.push(new PresetCellInfo(5,1,4));
		presets.push(new PresetCellInfo(5,4,8));
		presets.push(new PresetCellInfo(5,6,3));
		presets.push(new PresetCellInfo(5,9,1));
		presets.push(new PresetCellInfo(6,1,7));
		presets.push(new PresetCellInfo(6,5,2));
		presets.push(new PresetCellInfo(6,9,6));
		presets.push(new PresetCellInfo(7,2,6));
		presets.push(new PresetCellInfo(7,7,2));
		presets.push(new PresetCellInfo(7,8,8));
		presets.push(new PresetCellInfo(8,4,4));
		presets.push(new PresetCellInfo(8,5,1));
		presets.push(new PresetCellInfo(8,6,9));
		presets.push(new PresetCellInfo(8,9,5));
		presets.push(new PresetCellInfo(9,5,8));
		presets.push(new PresetCellInfo(9,8,7));
		presets.push(new PresetCellInfo(9,9,9));
		return presets;
	};
}