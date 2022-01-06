import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-datepickerDrag',
  //templateUrl: './datepicker.component.html',
  //styleUrls: ['./datepicker.component.css']
  template: `<input cdkDrag cdkDragBoundary="#canvas" [type]="props.type" [id]="props.id" 
  [value]="props.value" [class]="props.class" [style]="props.style" 
  (change)="dateValue($event)"
  (cdkDragEnded)="onDragEnded($event)" 
  [ngStyle]="{
    'position': 'fixed',
    'left': dagaX + 'px',
    'top': dagaY + 'px'
  }">`
})
export class DatepickerDragComponent implements OnInit,IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '2021-12-25',
    class: '',
    style: '',
    typeObj: 'datepickerDrag',
    type: 'date',
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    let browserWidth = window.innerWidth;
    let percentage = 0.95+((browserWidth-1280)/browserWidth);
    this.props.style='position:absolute;left:'+((this.dagaX-this.theX)*(percentage))+'px;top:'+(this.dagaY-this.theY)+'px;'; //the 86 from this point are all just for testing
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'date' + date.toString();
  }


  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  dateValue(val: any){
    this.props.value = val.target.value;
  }
  
  get htmlCode(): string {
    let tmpHtmlCode = '<input';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    if(this.props.value.trim().length > 0){
      tmpHtmlCode += ' value="' + this.props.value + '"';
    }

    //tmpHtmlCode += '>' + this.props.value + '</input>';
    tmpHtmlCode += '>';

    return tmpHtmlCode;
  }
}