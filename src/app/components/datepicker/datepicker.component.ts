import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-datepicker',
  //templateUrl: './datepicker.component.html',
  //styleUrls: ['./datepicker.component.css']
  template: `<input [type]="props.type" [id]="props.id">`
})
export class DatepickerComponent implements OnInit,IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: 'datepicker',
    type: 'date',
  };

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'button' + date.toString();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
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

    //tmpHtmlCode += '>' + this.props.value + '</input>';
    tmpHtmlCode += '>';

    return tmpHtmlCode;
  }
}