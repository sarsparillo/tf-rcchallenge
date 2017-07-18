var stage, stageWidth, stageHeight, snapWidth, preload;

var update = true,
	rotating = true,
	stageOne = true;

// define local image path
var imgurl = rcChallenge.theme_dir + "images/";

function init(){
	// make canvas area
	stage = new createjs.Stage("rc-canvas");

	// enable touch interactions if supported
	createjs.Touch.enable(stage); 
	stage.enableMouseOver();

	stageWidth = document.getElementById('rc-canvas').width;
	stageHeight = document.getElementById('rc-canvas').height;

	var tileWidth = 42;
	tilesContainer = stage.addChild(new createjs.Container());

	// preload and other images
	var manifest = [
		{ id: "th_blue1", src: imgurl + "thumb/blue1.png" },
		{ id: "th_blue2", src: imgurl + "thumb/blue2.png" },
		{ id: "th_blue3", src: imgurl + "thumb/blue3.png" },
		{ id: "th_green1", src: imgurl + "thumb/green1.png" },
		{ id: "th_green2", src: imgurl + "thumb/green2.png" },
		{ id: "th_green3", src: imgurl + "thumb/green3.png" },
		{ id: "th_green4", src: imgurl + "thumb/green4.png" },
		{ id: "th_cornerblue", src: imgurl + "cornerblue.png" },
		{ id: "th_cornerred", src: imgurl + "cornerred.png" },
		{ id: "th_pink1", src: imgurl + "thumb/pink1.png" },
		{ id: "th_orange2", src: imgurl + "thumb/orange2.png" },
		{ id: "th_loop", src: imgurl + "thumb/loop.png" },
		{ id: "th_tunnelred", src: imgurl + "tunnelred.png" },
		{ id: "th_tunnelpurple", src: imgurl + "tunnelpurple.png" },
		{ id: "th_start", src: imgurl + "start.png" },
		{ id: "th_end", src: imgurl + "end.png" },
		{ id: "blue1", src: imgurl + "blue1.png" },
		{ id: "blue2", src: imgurl + "blue2.png" },
		{ id: "blue3", src: imgurl + "blue3.png" },
		{ id: "green1", src: imgurl + "green1.png" },
		{ id: "green2", src: imgurl + "green2.png" },
		{ id: "green3", src: imgurl + "green3.png" },
		{ id: "green4", src: imgurl + "green4.png" },
		{ id: "cornerblue", src: imgurl + "cornerblue.png" },
		{ id: "cornerred", src: imgurl + "cornerred.png" },
		{ id: "pink1", src: imgurl + "pink1.png" },
		{ id: "orange2", src: imgurl + "orange2.png" },
		{ id: "loop", src: imgurl + "loop.png" },
		{ id: "start", src: imgurl + "start.png" },
		{ id: "end", src: imgurl + "end.png" },
		{ id: "tunnelred", src: imgurl + "tunnelred.png" },
		{ id: "tunnelpurple", src: imgurl + "tunnelpurple.png" },
		{ id: "ov_blue1", src: imgurl + "over/blue1.png" },
		{ id: "ov_blue2", src: imgurl + "over/blue2.png" },
		{ id: "ov_blue3", src: imgurl + "over/blue3.png" },
		{ id: "ov_green1", src: imgurl + "over/green1.png" },
		{ id: "ov_green2", src: imgurl + "over/green2.png" },
		{ id: "ov_green3", src: imgurl + "over/green3.png" },
		{ id: "ov_green4", src: imgurl + "over/green4.png" },
		{ id: "ov_cornerblue", src: imgurl + "over/cornerblue.png" },
		{ id: "ov_cornerred", src: imgurl + "over/cornerred.png" },
		{ id: "ov_pink1", src: imgurl + "over/pink1.png" },
		{ id: "ov_orange2", src: imgurl + "over/orange2.png" },
		{ id: "ov_loop", src: imgurl + "over/loop.png" },
		{ id: "ov_tunnelred", src: imgurl + "over/tunnelred.png" },
		{ id: "ov_tunnelpurple", src: imgurl + "over/tunnelpurple.png" },
		{ id: "ov_start", src: imgurl + "over/start.png" },
		{ id: "ov_end", src: imgurl + "over/end.png" },

		{ id: "n1", src: imgurl + "thumb/n1.png" },
		{ id: "th_n1", src: imgurl + "thumb/n1.png" },
		{ id: "ov_n1", src: imgurl + "thumb/n1.png" },

		{ id: "n2", src: imgurl + "thumb/n2.png" },
		{ id: "th_n2", src: imgurl + "thumb/n2.png" },
		{ id: "ov_n2", src: imgurl + "thumb/n2.png" },

		{ id: "n3", src: imgurl + "thumb/n3.png" },
		{ id: "th_n3", src: imgurl + "thumb/n3.png" },
		{ id: "ov_n3", src: imgurl + "thumb/n3.png" },

		{ id: "n4", src: imgurl + "thumb/n4.png" },
		{ id: "th_n4", src: imgurl + "thumb/n4.png" },
		{ id: "ov_n4", src: imgurl + "thumb/n4.png" },

		{ id: "n5", src: imgurl + "thumb/n5.png" },
		{ id: "th_n5", src: imgurl + "thumb/n5.png" },
		{ id: "ov_n5", src: imgurl + "thumb/n5.png" },

		{ id: "n6", src: imgurl + "thumb/n6.png" },
		{ id: "th_n6", src: imgurl + "thumb/n6.png" },
		{ id: "ov_n6", src: imgurl + "thumb/n6.png" },

		{ id: "n7", src: imgurl + "thumb/n7.png" },
		{ id: "th_n7", src: imgurl + "thumb/n7.png" },
		{ id: "ov_n7", src: imgurl + "thumb/n7.png" },

		{ id: "n8", src: imgurl + "thumb/n8.png" },
		{ id: "th_n8", src: imgurl + "thumb/n8.png" },
		{ id: "ov_n8", src: imgurl + "thumb/n8.png" },

		{ id: "n9", src: imgurl + "thumb/n9.png" },
		{ id: "th_n9", src: imgurl + "thumb/n9.png" },
		{ id: "ov_n9", src: imgurl + "thumb/n9.png" },

		{ id: "n10", src: imgurl + "thumb/n10.png" },
		{ id: "th_n10", src: imgurl + "thumb/n10.png" },
		{ id: "ov_n10", src: imgurl + "thumb/n10.png" },

		{ id: "n11", src: imgurl + "thumb/n11.png" },
		{ id: "th_n11", src: imgurl + "thumb/n11.png" },
		{ id: "ov_n11", src: imgurl + "thumb/n11.png" },

		{ id: "n12", src: imgurl + "thumb/n12.png" },
		{ id: "th_n12", src: imgurl + "thumb/n12.png" },
		{ id: "ov_n12", src: imgurl + "thumb/n12.png" },

		{ id: "n13", src: imgurl + "thumb/n13.png" },
		{ id: "th_n13", src: imgurl + "thumb/n13.png" },
		{ id: "ov_n13", src: imgurl + "thumb/n13.png" },

		{ id: "n14", src: imgurl + "thumb/n14.png" },
		{ id: "th_n14", src: imgurl + "thumb/n14.png" },
		{ id: "ov_n14", src: imgurl + "thumb/n14.png" },

	];
	preload = new createjs.LoadQueue(true);
	preload.loadManifest(manifest, true);
	// solution footer to card
	var cardFooter = new createjs.Bitmap(imgurl + "cardfooter.png");
		cardFooter.x = 0;
		cardFooter.y = 580;


	/* ================================= */
	/* ============ BUTTONS ============ */
	/* ================================= */


	// flip piece button
	var flipBtnData = {
		images: [ imgurl + "btns/flipsheet.png" ],
		frames: { width: 175, height: 65 }
	};
	var flipSprite = new createjs.SpriteSheet(flipBtnData);
	var flipBtn = new createjs.Sprite(flipSprite);

	flipBtn.x = 537;
	flipBtn.y = 149;
	flipBtn.on("mouseover", function(e) { 
		if (rotating) { flipBtn.gotoAndStop(1); };
		stage.update();} );
	flipBtn.on("rollout", function(e) {
		if (rotating) { flipBtn.gotoAndStop(0); };
		stage.update(); })
	flipBtn.on("mousedown", function(e) {
		if (rotating) { 
			flipBtn.gotoAndStop(2); 
			rotating = false;
		} else {
			flipBtn.gotoAndStop(1);
			rotating = true;
		}
		stage.update(); });
	
	stage.addChild(flipBtn);

	// next stage button
	var puzzleBtnData = {
		images: [ imgurl + "btns/puzzlesheet.png" ],
		frames: { width: 175, height: 65 }
	};
	var puzzleSprite = new createjs.SpriteSheet(puzzleBtnData);
	var puzzleBtn = new createjs.Sprite(puzzleSprite);

	puzzleBtn.x = 537;
	puzzleBtn.y = 566;
	puzzleBtn.on("mouseover", function(e) { 
		puzzleBtn.gotoAndStop(1);
		stage.update();} );
	puzzleBtn.on("rollout", function(e) {
		puzzleBtn.gotoAndStop(0);
		stage.update(); })
	puzzleBtn.on("mousedown", function(e) {
		puzzleBtn.gotoAndStop(2); 
		stage.update(); });
	puzzleBtn.on("pressup", function(e) { 
		puzzleBtn.gotoAndStop(1);
		stage.update();} );
	puzzleBtn.on("click", function(e) {
		stageOne = false;
		makeSolution('solution');
		stage.removeChild(puzzleBtn);
		stage.removeChild(cardFooter);

		stage.removeChild(flipBtn);
		addPostNumbers();
		addPostNumbers();
		addPostNumbers();
		addPostNumbers();
		addPostNumbers();

		stage.addChild(finishBtn);
		stage.update();
	})

	var finishBtnData = {
		images: [ imgurl + "btns/finishsheet.png" ],
		frames: { width: 175, height: 65 }
	};
	var finishSprite = new createjs.SpriteSheet(finishBtnData);
	var finishBtn = new createjs.Sprite(finishSprite);

	finishBtn.x = 537;
	finishBtn.y = 566;
	finishBtn.on("mouseover", function(e) { 
		finishBtn.gotoAndStop(1);
		stage.update();} );
	finishBtn.on("rollout", function(e) {
		finishBtn.gotoAndStop(0);
		stage.update(); })
	finishBtn.on("mousedown", function(e) {
		finishBtn.gotoAndStop(2); 
		stage.update(); });
	finishBtn.on("pressup", function(e) { 
		finishBtn.gotoAndStop(1);
		stage.update();} );
	finishBtn.on("click", function(e) {
		makeSolution('challenge');
		document.getElementById('submit').className = '';
		stage.update();
	})
	
	stage.addChild(puzzleBtn);


	/* ================================= */
	/* ========= PIECE ACTIONS ========= */
	/* ================================= */


	// draw pieces to map
	function drawPieces(elem, xPos, yPos, xHint, yHint, pNum) {
		var bmp, iSrc;
			iSrc = imgurl + "thumb/" + elem + ".png";

			bmp = new createjs.Bitmap(iSrc);
			bmp.regX = bmp.regY = 303;
			bmp.x = bmp.originX = xPos;
			bmp.y = bmp.originY = yPos;
			bmp.set({
				name: elem,
				cursor: "pointer",
				isDragging: false,
				isLegitPlacement: false,
				isThumb: true,
				isInFooter: false,
				footerX: xHint,
				footerY: yHint,
				storeRotation: 0,
				storeFlip: 1,
				isPostNum: pNum
			})

			bmp.image.onload = function() {
				stage.addChild(bmp);
				stage.update();
			}

			bmp.on("mousedown", function(e) {
				this.offset = { x: this.x - e.stageX, y: this.y - e.stageY };
			});

			bmp.on("mouseover", function(e) {
				if (!this.isThumb && !this.isInFooter) {
					this.image = preload.getResult("ov_" + this.name);
					stage.update();
				}
			})
			bmp.on("mouseout", function(e) {
				if (!this.isThumb && !this.isInFooter) {
					this.image = preload.getResult(this.name);
					stage.update();
				}
			})

			// pressmove event will run while mouse moves until released
			bmp.on("pressmove", function(e) {
				var piece = this;

				if (stageOne || piece.isPostNum == true) { dragPiece(piece, e); }
				
				stage.update(); 
			});

			bmp.on("pressup", function(e) {
				var piece = this;
				
				if (stageOne || piece.isPostNum == true) { dropPiece(piece); }
				else { containPiece(piece); }

				stage.update();
			})

		return bmp;
	};

	// drag tile
	function dragPiece(piece, event) {
		if (piece.isThumb) { 
			piece.image = preload.getResult(piece.name);
			piece.isThumb = false; }

		if (!piece.isDragging) { piece.isDragging = true; };

		piece.x = event.stageX + piece.offset.x;
		piece.y = event.stageY + piece.offset.y;
		stage.setChildIndex(piece, stage.getNumChildren()-1);

		// intersection check, place piece on tile snap point
		if (tilesContainer.getObjectUnderPoint(piece.x, piece.y, 0)) {
			piece.isLegitPlacement = true;

			var tileSpace = tilesContainer.getObjectUnderPoint(piece.x, piece.y, 0);

			piece.x = tileSpace.xSnap;
			piece.y = tileSpace.ySnap;
		} 
		else { piece.isLegitPlacement = false; }
	}

	// drop tile
	function dropPiece(piece) {
		if (!piece.isDragging && !piece.isThumb) { 
			if (piece.isPostNum == false) {
				if (rotating === true) { piece.rotation = piece.storeRotation = piece.rotation + 90; }
				else { 
					if (piece.scaleX == 1) { piece.scaleX = piece.storeFlip = -1; }
					else { piece.scaleX = piece.storeFlip = 1; };
					rotating = true; 
					flipBtn.gotoAndStop(0); }
				}
			}
		if (!piece.isLegitPlacement) {
			piece.x = piece.originX;
			piece.y = piece.originY;
			piece.rotation = 0;
			piece.scaleX = piece.scaleY = 1;
			piece.isThumb = true;
			piece.image = preload.getResult("th_" + piece.name);
		}				
		piece.isDragging = false;
	}

	var footerPieceList = [];

	// move tile to grid container
	function containPiece(piece) {
		if (piece.footerX != 0 && !piece.isThumb) {
			if (!piece.isInFooter) {
				piece.originX = piece.x;
				piece.originY = piece.y;

				footerPieceList.push(piece.name);
				pieceCounter(piece, inFooterArray(piece.name));

				piece.image = preload.getResult("th_" + piece.name);
				piece.x = piece.footerX;
				piece.y = piece.footerY;
				piece.rotation = 0;
				piece.scaleX = 1;
				piece.isInFooter = true;
			} else {				
				piece.x = piece.originX;
				piece.y = piece.originY;

				footerPieceList.splice(footerPieceList.indexOf(piece.name), 1);
				pieceCounter(piece, inFooterArray(piece.name));

				piece.rotation = piece.storeRotation;
				piece.scaleX = piece.storeFlip;
				piece.image = preload.getResult(piece.name);
				piece.isInFooter = false;
			}
		}
	}

	// count iterations in footer
	function inFooterArray(y) {
		var count = {};
		footerPieceList.forEach(function(x) {
			count[x] = (count[x] || 0) + 1;
		})
		return count[y];
	}

	// draw piece counter
	function pieceCounter(piece, num) {
		var pieceText = new createjs.Text("x" + num, "12px Arial", "#000000");
		if (piece.name == "cornerred" || piece.name == "cornerblue" ) {
			pieceText.x = piece.footerX + 38;
			pieceText.y = piece.footerY + 38;
		} else if (piece.name == "loop") {
			pieceText.x = piece.footerX + 35;
			pieceText.y = piece.footerY + 25;
		} else {
			pieceText.x = piece.footerX + 20;
			pieceText.y = piece.footerY;			
		}

		var tb = new createjs.Graphics();
		tb.beginFill("#FFFFFF").drawRect(pieceText.x,pieceText.y,13,13);
		var textBackground = new createjs.Shape(tb);
		
		if (num != null) {
			stage.addChild(textBackground);
			stage.addChild(pieceText);
			stage.update();
		} else {
			stage.addChild(textBackground);
			stage.update();
		}
	}




	/* ================================= */
	/* =======   DRAW TO BOARD   ======= */
	/* ================================= */

	// make grid of tile spaces
	function addTileSpaces() {
		for (var row = 0; row < 5; row++) {
			for (var col = 0; col < 5; col++) {
				var xPos = 80 + (col * 72),
					yPos = 173 + (row * 73);

				var tile = new createjs.Shape();
				tile.graphics
					.beginFill("rgba(124,124,124,0.1)")
					.drawRect(xPos, yPos, tileWidth, tileWidth);
				tile.set({
					regX: tileWidth / 2,
					regY: tileWidth / 2,
					name: "tile_" + row + "_" + col,
					xSnap: xPos,
					ySnap: yPos,
				})
				
				tilesContainer.addChild(tile);
			};
		};
		stage.update();
	};
	addTileSpaces();


	// add game pieces to board
	// details are name, sideboardx, sideboardy, footerx, footery
	function addPieces() {
		var bitmap;
		// blue pieces
		bitmap = drawPieces("blue1", 508, 249, 55, 550, false);
		bitmap = drawPieces("blue1", 508, 249, 55, 550, false);
		bitmap = drawPieces("blue2", 559, 249, 55, 570, false);
		bitmap = drawPieces("blue2", 559, 249, 55, 570, false);
		bitmap = drawPieces("blue3", 610, 249, 55, 590, false);
		bitmap = drawPieces("blue3", 610, 249, 55, 590, false);

		// pink and orange pieces
		bitmap = drawPieces("pink1", 740, 249, 112, 550, false);
		bitmap = drawPieces("pink1", 740, 249, 112, 550, false);
		bitmap = drawPieces("orange2", 740, 312, 112, 570, false);
		bitmap = drawPieces("orange2", 740, 312, 112, 570, false);

		// green pieces
		bitmap = drawPieces("green1", 508, 312, 112, 590, false);
		bitmap = drawPieces("green1", 508, 312, 112, 590, false);
		bitmap = drawPieces("green1", 508, 312, 112, 590, false);
		bitmap = drawPieces("green2", 559, 312, 55, 610, false);
		bitmap = drawPieces("green2", 559, 312, 55, 610, false);
		bitmap = drawPieces("green2", 559, 312, 55, 610, false);
		bitmap = drawPieces("green3", 610, 312, 112, 610, false);
		bitmap = drawPieces("green3", 610, 312, 112, 610, false);
		bitmap = drawPieces("green4", 662, 312, 55, 630, false);
		bitmap = drawPieces("green4", 662, 312, 55, 630, false);

		// corner pieces
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);
		bitmap = drawPieces("cornerblue", 499, 466, 175, 565, false);

		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);
		bitmap = drawPieces("cornerred", 583, 466, 255, 565, false);

		// loop and tunnels
		bitmap = drawPieces("loop", 708, 398, 345, 570, false);
		bitmap = drawPieces("tunnelred", 672, 443, 0, 0, false);
		bitmap = drawPieces("tunnelpurple", 672, 465, 0, 0, false);
		
		// start and end
		bitmap = drawPieces("start", 499, 371, 0, 0, false);
		bitmap = drawPieces("end", 583, 371, 0, 0, false);
	};
	addPieces();

	function addPostNumbers() {
		var postNum;
		postNum = drawPieces("n1", 505, 160, 0, 0, true);
		postNum = drawPieces("n2", 545, 160, 0, 0, true);
		postNum = drawPieces("n3", 585, 160, 0, 0, true);
		postNum = drawPieces("n4", 625, 160, 0, 0, true);
		postNum = drawPieces("n5", 665, 160, 0, 0, true);
		postNum = drawPieces("n6", 705, 160, 0, 0, true);
		postNum = drawPieces("n7", 745, 160, 0, 0, true);
		postNum = drawPieces("n8", 505, 205, 0, 0, true);
		postNum = drawPieces("n9", 545, 205, 0, 0, true);
		postNum = drawPieces("n10", 585, 205, 0, 0, true);
		postNum = drawPieces("n11", 625, 205, 0, 0, true);
		postNum = drawPieces("n12", 665, 205, 0, 0, true);
		postNum = drawPieces("n13", 705, 205, 0, 0, true);
		postNum = drawPieces("n14", 745, 205, 0, 0, true);
	}

	function solutionFooter() {
		cardFooter.image.onload = function() {
			stage.addChild(cardFooter);
			stage.update();
		}
	};
	solutionFooter();

	// add pieces background after all other pieces, place at 0
	var pieceBackground = new createjs.Bitmap(imgurl + "piecesbg.jpg");
		pieceBackground.x = 450;
		pieceBackground.y = 0;
	pieceBackground.image.onload = function() {
		stage.addChildAt(pieceBackground, 0);
		stage.update();
	};

	// add background after all other pieces, place at 0
	var background = new createjs.Bitmap(imgurl + "card.png");
	background.image.onload = function() {
		stage.addChildAt(background, 0);
		stage.update();
	};

	// save portion as image
	function makeSolution(type){
		// clip canvas to make new element
		var clip_canvas = document.createElement("canvas");
			clip_canvas.style.display = "none";
			document.body.appendChild(clip_canvas);
			clip_canvas.width = 450;
			clip_canvas.height = 657;
		// define data for canvas
		var clip_ctx = clip_canvas.getContext("2d");
			clip_ctx.drawImage(
				document.getElementById("rc-canvas"),
				0, 0,
				450, 657,
				0, 0,
				clip_canvas.width,
				clip_canvas.height
				);

		var clip_data = clip_canvas.toDataURL("image/png");

		document.getElementById("rc-" + type + "-img").innerHTML = "<img src=" + clip_data + " alt='" + type + " image' />";
		document.getElementById("rc-" + type + "-input").value = clip_data;
	};

}; // end init();


// page has jquery, so let's use it to run init...
(function(){ 
	if (jQuery('.rollercoaster-create').length) { init(); } 

	var theDiv = document.getElementById('rc-solution-img');
	theDiv.addEventListener('click', function() { 
		if (theDiv.classList.contains('hidden-solution')) {
			theDiv.classList.remove('hidden-solution'); 
		} else { theDiv.classList.add('hidden-solution'); }
	});

})();