import { Component, ViewChild, ElementRef, OnInit, HostListener, Renderer2 } from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS, KEY, COLORS, LINES_PER_LEVEL, LEVEL, POINTS } from './constants';
import { Piece, IPiece } from './piece.component';
import { GameService } from './game.service';


@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('next', { static: true })
  canvasNext!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  ctxNext!: CanvasRenderingContext2D;
  board!: number[][];
  time!: { start: number; elapsed: number; level: number };
  points!: number;
  lines!: number;
  level!: number;
  piece!: Piece;
  next!: Piece;
  requestId!: number;
  moves: { [key: number]: (p: IPiece) => IPiece } = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.ESC) {
      this.gameOver();
    } else if (this.moves[event.keyCode]) {
      event.preventDefault();
      // Get new state
      let p = this.moves[event.keyCode](this.piece);
      if (event.keyCode === KEY.SPACE) {
        while (this.service.valid(p, this.board)) {
          this.points += POINTS.HARD_DROP / 10;
          this.piece.move(p);
          p = this.moves[KEY.DOWN](this.piece);
        }
      } else if (this.service.valid(p, this.board)) {
        this.piece.move(p);
        if (event.keyCode === KEY.DOWN) {
          this.points += POINTS.SOFT_DROP / 10;
        }
      }
      // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      // this.piece.draw();
    }
  }

  constructor(private service: GameService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.initBoard();
    this.initNext();
    this.resetGame();
  }

  initBoard() {
    // Get the 2D context that we draw on.
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.ctx = context;
      // Calculate the size of the canvas from constants.
      this.ctx.canvas.width = COLS * BLOCK_SIZE;
      this.ctx.canvas.height = ROWS * BLOCK_SIZE;
      this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
  }

  initNext() {
    const context = this.canvasNext.nativeElement.getContext('2d');
    if (context) {
      this.ctxNext = context;

      // Calculate size of canvas from constants.
      this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
      this.ctxNext.canvas.height = 4 * BLOCK_SIZE;

      this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

    }
  }

  play() {
    this.resetGame();
    this.next = new Piece(this.ctx);
    this.piece = new Piece(this.ctx);
    this.next.drawNext(this.ctxNext);
    this.time.start = performance.now();
    // If we have an old game running a game then cancel the old
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.animate();
  }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.time = { start: 0, elapsed: 0, level: LEVEL[this.level] };
    // const rightColumn = this.el.nativeElement.querySelector('.right-column');
    // if (rightColumn) {
    //   this.renderer.setStyle(rightColumn, 'margin-left', "0px");
    //   // alert("test");
    // }

  }

  animate(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      } else if (this.points >= 404){
        this.win();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }


  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  drop(): boolean {
    let p = this.moves[KEY.DOWN](this.piece);
    if (this.service.valid(p, this.board)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y <= 0) {
        // Game over
        return false;
      }
      this.piece = this.next;
      this.next = new Piece(this.ctx);
      this.next.drawNext(this.ctxNext);
    }
    return true;
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.points += this.service.getLinesClearedPoints(lines, this.level) / 10;
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        type LevelKey = keyof typeof LEVEL;
        const levelKey: LevelKey = this.level;
        this.time.level = LEVEL[levelKey];
      }
    }
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  win(){
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 3);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('BRAVO !', 2.5, 4.1);
    this.ctx.fillText('Votre score : ' + this.floor(this.points), 1.3, 5.3);
    // const rightColumn = this.el.nativeElement.querySelector('.right-column');
    // if (rightColumn) {
    //   this.renderer.setStyle(rightColumn, 'margin-left', 0);
    //   alert("test");
    // }

  }

  gameOver() {
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 3);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4.1);
    this.ctx.fillText('Votre score : ' + this.floor(this.points), 1.3, 5.3);
    // const rightColumn = this.el.nativeElement.querySelector('.right-column');
    // if (rightColumn) {
    //   this.renderer.setStyle(rightColumn, 'margin-left', 0);
    //   alert("test");
    // }
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  floor(point: number){
    return Math.floor(point);
  }
}
