import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit,IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Dropdown',
    class: 'btn btn-secondary',
    style: '',
    typeObj: 'dropdown',
    type: 'button',
    numOfLinks: '3',
  };

  fakeArray = new Array(this.props.numOfLinks);

  constructor(canvas: ElementRef) { 
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'dropdown' + date.toString();
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
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' class="dropdown" id="' + this.props.id + '">';
    tmpHtmlCode +="\n" + ' <button class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + this.props.style + '" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' + this.props.value + ' </button>';
    tmpHtmlCode +="\n" + ' <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">Choice 1</a>';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">Choice 2</a>';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">Choice 3</a>';
    tmpHtmlCode +="\n" + ' </div>';
    tmpHtmlCode +="\n" + ' </div>';
    tmpHtmlCode +="\n" + this.props.numOfLinks;
    
  
    return tmpHtmlCode;
  } 
  ngOnInit(): void {
    
  }

}
