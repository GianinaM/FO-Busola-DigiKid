import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintComponent } from './paint.component';
import { ElementRef } from '@angular/core';

describe('PaintComponent', () => {
  let component: PaintComponent;
  let fixture: ComponentFixture<PaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should have a canvas', () => {
    ///sa existe un ElementRef in componenta, care sa aiba clasa html-canvas
    expect(component.canvas).toBeTruthy();
  });

  it('should have a canvas of type ElementRef', () => {
    ///sa existe un ElementRef in componenta, care sa aiba clasa html-canvas
    expect(component.canvas).toBeInstanceOf(ElementRef);
  });

  it('should have a context', () => {
    ///sa existe un ElementRef in componenta, care sa aiba clasa html-canvas
    expect(component.context).toBe(component.canvas.nativeElement.getContext('2d'));
  });


  it('should call function the startDraw when mousedown for canvas', () => {
    spyOn(component, 'startDraw');

    (component.canvas.nativeElement as HTMLCanvasElement).dispatchEvent(new Event('mousedown'));

    expect(component.startDraw).toHaveBeenCalledTimes(1);
  });

  it('should call function the draw when mousemove for canvas', () => {
    spyOn(component, 'draw');

    (component.canvas.nativeElement as HTMLCanvasElement).dispatchEvent(new Event('mousemove'));

    expect(component.draw).toHaveBeenCalledTimes(1);
  });

  it('should call function the endDraw when mouseup for canvas', () => {
    spyOn(component, 'endDraw');

    (component.canvas.nativeElement as HTMLCanvasElement).dispatchEvent(new Event('mouseup'));

    expect(component.endDraw).toHaveBeenCalledTimes(1);
  });

  it('should call function the endDraw when mouseleave for canvas', () => {
    spyOn(component, 'endDraw');

    (component.canvas.nativeElement as HTMLCanvasElement).dispatchEvent(new Event('mouseleave'));

    expect(component.endDraw).toHaveBeenCalledTimes(1);
  });

  it('should drawing set false by default', () => {
    expect(component.drawing).toBeFalsy();
  });

  it('should set drawing to true when startDraw is called', () => {
    component.drawing = false;
    component.startDraw( new MouseEvent('test', {clientX: 0, clientY: 0}));

    expect(component.drawing).toBeTruthy();
  });

  it('should set drawing to false when endDraw is called', () => {
    component.drawing = true;
    component.endDraw();

    expect(component.drawing).toBeFalsy();
  });

  it('should set values on prevPos when startDraw is called', () => {

    let mouseEv = new MouseEvent('test', {clientX: 2, clientY: 19});
    component.startDraw(mouseEv);

    expect(component.prevPos).toEqual({x: 2, y:  19});
  });

  it('should return from draw if context do not exist', () => {

    component.context = undefined;
    component.draw(new MouseEvent('testDraw', {clientX: 0, clientY: 0}));

    expect(component.draw).toThrow();
  });

  it('should call function the beginPath when mouseleave for canvas', async(() => {
    spyOn(component.context, 'beginPath');

    component.context = (component.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    component.draw(new MouseEvent('testDraw', {clientX: 0, clientY: 0}));

    expect(component.context.beginPath).toHaveBeenCalled();
  }));

  it('should not call moveTo from draw if drawing is false', () => {
    spyOn(component.context, 'moveTo');

    component.drawing = false;
    component.draw(new MouseEvent('moveTo', {clientX: 5, clientY: 5}));

    expect(component.context.moveTo).toHaveBeenCalledTimes(0);
  });

  it('should call moveTo when draw is called', () => {
    spyOn(component.context, 'moveTo');

    component.startDraw(new MouseEvent('startDraw', {clientX: 0, clientY: 0}))
    component.draw(new MouseEvent('moveTo', {clientX: 5, clientY: 5}));

    expect(component.context.moveTo).toHaveBeenCalledTimes(1);
  });

  it('should not call lineTo from draw if drawing is false', () => {
    spyOn(component.context, 'lineTo');

    component.drawing = false;
    component.draw(new MouseEvent('lineTo', {clientX: 5, clientY: 5}));

    expect(component.context.lineTo).toHaveBeenCalledTimes(0);
  });

  it('should call lineTo when draw is called', () => {
    spyOn(component.context, 'lineTo');

    component.startDraw(new MouseEvent('startDraw', {clientX: 0, clientY: 0}))
    component.draw(new MouseEvent('lineTo', {clientX: 5, clientY: 5}));

    expect(component.context.lineTo).toHaveBeenCalledTimes(1);
  });

  it('should not call stroke from draw if drawing is false', () => {
    spyOn(component.context, 'stroke');

    component.drawing = false;
    component.draw(new MouseEvent('stroke', {clientX: 5, clientY: 5}));

    expect(component.context.stroke).toHaveBeenCalledTimes(0);
  });

  it('should call stroke when draw is called', () => {
    spyOn(component.context, 'stroke');

    component.startDraw(new MouseEvent('startDraw', {clientX: 0, clientY: 0}))
    component.draw(new MouseEvent('stroke', {clientX: 5, clientY: 5}));

    expect(component.context.stroke).toHaveBeenCalledTimes(1);
  });

  it('should reset values from prev when draw is called', () => {

    component.drawing = true;
    component.prevPos = {x: 0, y: 0};
    component.draw(new MouseEvent('stroke', {clientX: 5, clientY: 7}));

    expect(component.prevPos).toEqual({x: 5, y:  7});
  });

  it('should remove values from prev when endDraw is called', () => {

    component.prevPos = {x: 6, y: 8};
    component.endDraw();

    expect(component.prevPos).toBeFalsy();
  });

});
