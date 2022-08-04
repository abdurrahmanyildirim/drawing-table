import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawingService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(private drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    this.drawingService.init(this.canvas);
    window.addEventListener('resize', () => {
      this.drawingService.resizeCanvas();
    });
    this.drawingService.resizeCanvas();
  }

  draw(event: MouseEvent | TouchEvent): void {
    this.drawingService.draw(event);
  }

  startPosition(event: any): void {
    this.drawingService.startPosition(event);
  }

  finishedPosition(): void {
    this.drawingService.finishedPosition();
  }

  activateEraser(): void {
    this.drawingService.activateEraser();
  }

  activatePencil(): void {
    this.drawingService.activatePencil();
  }

  onColorChange(event: Event): void {
    this.drawingService.changeColor(event);
  }

  download(): void {
    this.drawingService.download();
  }

  clean(): void {
    this.drawingService.clean();
  }
}
