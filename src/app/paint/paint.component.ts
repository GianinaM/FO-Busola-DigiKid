import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas', {static: false}) public canvas: ElementRef;

  public context: CanvasRenderingContext2D;

  public drawing: boolean = false;

  public prevPos;

  constructor() { }

  ngAfterViewInit(): void {
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');

  }

  ngOnInit(): void {
  }

  public startDraw(e: MouseEvent){
    this.drawing = true;
    this.prevPos = {
      x: e.clientX,
      y: e.clientY
    };
    console.log("startDraw" + this.prevPos.x + " " + this.prevPos.y);

  }

  public draw(e: any){

    const rect = this.canvas.nativeElement.getBoundingClientRect();

    if(!this.context) {
      return;
    }

    this.context.beginPath();

    if (this.drawing) {
      this.context.moveTo(this.prevPos.x - rect.left, this.prevPos.y - rect.top); //from here

      this.context.lineTo(e.clientX - rect.left, e.clientY - rect.top); //to here

      this.context.stroke();

      this.prevPos = {x: e.clientX, y: e.clientY};
    }
  }

  public endDraw(){
    this.drawing = false;
    this.prevPos = undefined;
  }
}
