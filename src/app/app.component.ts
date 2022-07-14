import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas') canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  painting = false;
  content = null;
  currentColor = 'black';
  lineCap: CanvasLineCap = 'round';
  lineWidth = 5;
  replacementY = 23;
  replacementX = 0;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
    this.resizeCanvas();
  }

  resizeCanvas(): void {
    this.content = this.context.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.context.putImageData(this.content, 0, 0);
  }

  startPosition(event: MouseEvent): void {
    this.painting = true;
    this.draw(event);
  }

  finishedPosition(): void {
    this.painting = false;
    this.context.beginPath();
  }

  draw(e: MouseEvent): void {
    if (!this.painting) {
      return;
    }
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = this.lineCap;
    this.context.strokeStyle = this.currentColor;
    this.context.lineTo(
      e.clientX + this.replacementX,
      e.clientY + this.replacementY
    );
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(
      e.clientX + this.replacementX,
      e.clientY + this.replacementY
    );
  }

  activateEraser(): void {
    this.replacementY = 20;
    this.replacementX = 3;
    this.lineWidth = 10;
    this.currentColor = 'white';
    this.lineCap = 'square';
    this.canvas.nativeElement.style.cursor =
      'url("../assets/eraser.png"), auto';
  }

  activatePencil(): void {
    this.replacementY = 23;
    this.replacementX = 0;
    this.lineWidth = 5;
    this.currentColor = 'black';
    this.lineCap = 'round';
    this.canvas.nativeElement.style.cursor =
      'url("../assets/pencil.png"), auto';
  }
}
