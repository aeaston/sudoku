function Sudoku() {
	var boardGenerator = new BoardGenerator();
	var presetCells = boardGenerator.Generate();
	var board = new Board();
	board.SetUp(presetCells);

	var cellSelected = false;

	this.GetBoard = function() {
		return board;
	};

	this.ClearAll = function() {
		board.Reset();
		this.UpdateUI();
	};

	this.UpdateUI = function() {
		var uiTrs = $('#board tr');
		for (var row = 0; row < board.boardSize; row++) {
			var children = $(uiTrs[row]).children();
			for (var col = 0; col < board.boardSize; col++) {
				var cell = board.GetCell(row, col);
				if (cell.WasPreset()) {
					$(($(uiTrs[row]).children())[col]).addClass("stuck");
				}
				$(($(uiTrs[row]).children())[col]).html(cell.GetVal());
			}
		}
		$('#board .selected').click();
	};

	this.DisplayVictory = function() {
		$('#victory-message').show();
	};

	this.HookUpUI = function() {
		$('#board td').click(function(event) {
			if (cellSelected && !$(this).hasClass("selected")) {
				$('#board .selected').removeClass("selected");
				cellSelected = false;
				$('#cell-options-overlay').show();
			}
			cellSelected = !cellSelected;
			$(this).toggleClass("selected");
			$('#cell-options-overlay').toggle();
		});
		$('#number-options td').click(function() {
			var value = parseInt($(this).html());
			var rowAndCol = game.GetRowAndColumnOfSelected();
			board.MarkCell(rowAndCol.row, rowAndCol.col, value);
			game.UpdateUI();
			if (board.IsSolved()) {
				game.DisplayVictory();
			}
		});
		$('#clear-cell-button').click(function() {
			var rowAndCol = game.GetRowAndColumnOfSelected();
			board.ClearCell(rowAndCol.row, rowAndCol.col);
			game.UpdateUI();
		});
	};

	this.GetRowAndColumnOfSelected = function() {
		var row = parseInt($('#board .selected').parent().attr("row"));
		var children = $('#board .selected').parent().children();
		var col = -1;
		for (var i in children) {
			if ($(children[i]).hasClass("selected")) {
				col = i;
				break;
			}
		}
		return {row: row, col: col};
	};

	this.HookUpUI();
	this.UpdateUI();
}

function Board(size) {
	this.boardSize = size || 9;
	this.numFilled = 0;
	this.board = new Array(this.boardSize);
	for (var row = 0; row < this.boardSize; row++) {
		this.board[row] = new Array(this.boardSize);
		for (var col = 0; col < this.boardSize; col++) {
			this.board[row][col] = new Cell();
		}
	}

	this.SetUp = function(presetCells) {
		for (var i in presetCells) {
			this.board[presetCells[i].GetRow() - 1][presetCells[i].GetCol() - 1] = presetCells[i];
			this.numFilled++;
		}
	};

	this.GetCell = function(row, col) {
		return this.board[row][col];
	};

	this.MarkCell = function(row, col, val) {
		var curCell = this.board[row][col];
		if (!curCell.WasPreset()) {
			if (!curCell.GetVal()) {
				this.numFilled++;
			}
			curCell.SetVal(val);
		}
	};

	this.ClearCell = function(row, col) {
		var curCell = this.board[row][col];
		if (curCell.GetVal() && !curCell.WasPreset()) {
			curCell.SetVal("");
			this.numFilled--;
		}
	};

	this.Reset = function() {
		for (var row = 0; row < this.boardSize; row++) {
			for (var col = 0; col < this.boardSize; col++) {
				var curCell = this.board[row][col];
				if (!curCell.WasPreset()) {
					if (curCell.GetVal()) {
						this.numFilled--;
					}
					curCell.ClearVal();
				}
			}
		}
	};

	this.CausedError = function(row, col) {
		for (var i = 0; i < this.boardSize; i++) {
			if (i !== row && (this.board[row][col]).GetVal() && (this.board[i][col]).GetVal() === (this.board[row][col]).GetVal()) {
				return true;
			}
		}
		for (var i = 0; i < this.boardSize; i++) {
			if (i !== col && (this.board[row][col]).GetVal() && (this.board[row][i]).GetVal() === (this.board[row][col]).GetVal()) {
				return true;
			}
		}
		var rowStart = 3 * Math.floor(row / 3);
		var colStart = 3 * Math.floor(col / 3);
		var sectionSize = Math.sqrt(this.boardSize);
		for (var i = rowStart; i < rowStart + sectionSize; i++) {
			for (var j = colStart; j < colStart + sectionSize; j++) {
				if ((row !== i || col !== j) && (this.board[row][col]).GetVal() && (this.board[i][j]).GetVal() === (this.board[row][col]).GetVal()) {
					return true;
				}
			}
		}
		return false;
	};

	this.CheckForErrors = function() {
		/* Note that this is not the most efficient way to do this. Instead
		 * of checking once per cell, we could instead check once per row,
		 * col, and section. Doing that would be three times faster. However
		 * because this action is done after updating the UI, because it is
		 * uncommon that someone will quickly interact with the board after
		 * placing a number, and because on a 9x9 board this algorithm will
		 * not be noticably slower, I have decided to go the ease of coding
		 * route.
		 */
		for (var i = 0; i < this.boardSize; i++) {
			for (var j = 0; j < this.boardSize; j++) {
				if (this.CausedError(i, j)) {
					return true;
				}
			}
		}
		return false;
	};

	this.IsSolved = function() {
		return !this.CheckForErrors() && (this.numFilled === this.boardSize * this.boardSize);
	};
}

function Cell(row, col, val, preset) {
	this.value = val || "";
	this.row = row;
	this.col = col;
	this.preset = preset || false;

	this.GetRow = function() {
		return this.row;
	};

	this.GetCol = function() {
		return this.col;
	};

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

function BoardGenerator() {
	this.Generate = function() {
		var presets = new Array();
		presets.push(new Cell(1,1,5,true));
		presets.push(new Cell(1,2,3,true));
		presets.push(new Cell(1,5,7,true));
		presets.push(new Cell(2,1,6,true));
		presets.push(new Cell(2,4,1,true));
		presets.push(new Cell(2,5,9,true));
		presets.push(new Cell(2,6,5,true));
		presets.push(new Cell(3,2,9,true));
		presets.push(new Cell(3,3,8,true));
		presets.push(new Cell(3,8,6,true));
		presets.push(new Cell(4,1,8,true));
		presets.push(new Cell(4,5,6,true));
		presets.push(new Cell(4,9,3,true));
		presets.push(new Cell(5,1,4,true));
		presets.push(new Cell(5,4,8,true));
		presets.push(new Cell(5,6,3,true));
		presets.push(new Cell(5,9,1,true));
		presets.push(new Cell(6,1,7,true));
		presets.push(new Cell(6,5,2,true));
		presets.push(new Cell(6,9,6,true));
		presets.push(new Cell(7,2,6,true));
		presets.push(new Cell(7,7,2,true));
		presets.push(new Cell(7,8,8,true));
		presets.push(new Cell(8,4,4,true));
		presets.push(new Cell(8,5,1,true));
		presets.push(new Cell(8,6,9,true));
		presets.push(new Cell(8,9,5,true));
		presets.push(new Cell(9,5,8,true));
		presets.push(new Cell(9,8,7,true));
		presets.push(new Cell(9,9,9,true));
		return presets;
	};
}

var game = new Sudoku();