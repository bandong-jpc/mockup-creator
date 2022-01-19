import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-labelDrag',
  templateUrl: './labelDrag.component.html',
  styleUrls: ['./labelDrag.component.css'],
})
export class LabelDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Label',
    class: '',
    style: '',
    typeObj: 'labelDrag',
    type: '',
    selected : false,
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2: any;
  mousePositionXV2 = 310;
  mousePositionYV2 = 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.percentageX = ((this.xmouse - this.theX) / 1280) * 100;
    this.percentageY = ((this.ymouse - this.theY) / 720) * 100;

    if (this.whatComponent2 == 'loginLabelUser') {
      this.props.value = 'Username';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'loginLabelPass') {
      this.props.value = 'Password';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'carrierLabel') {
      this.props.value = 'Carrier';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'invoiceFromLabel') {
      this.props.value = 'Invoice number from';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;width:500px';
    } else if (this.whatComponent2 == 'invoiceToLabel') {
      this.props.value = 'Invoice number to';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'shippingFromLabel') {
      this.props.value = 'Shipping Date from';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'shippingToLabel') {
      this.props.value = 'Shipping Date to';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'addressLabel') {
      this.props.value = 'Address';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'deliveryNameLabel') {
      this.props.value = 'Delivery name';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'remarksLabel') {
      this.props.value = 'Remarks';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'userIDLabel') {
      this.props.value = 'UserID';
      this.props.style =
        'color:white;position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'usernameLabel') {
      this.props.value = 'UserName';
      this.props.style =
        'color:white;position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'HPLabel1') {
      this.props.value = `チケン・サンズ・グルメ・バーガー`;
      this.props.style = `color: white;
      font-size: 30px;
      width: 600px;position:absolute;top:8.472222222222223%;left:0.9375%;`;
    } else if (this.whatComponent2 == 'HPLabel2') {
      this.props.value = `Event Highlight`;
      this.props.style = `color: white;
      font-family: "Times New Roman", Times, serif;
      font-style: italic;
      font-size: 15px;
      width: 600px;position:absolute;left:47.34375%;top:21.666666666666668%;`;
    } else if (this.whatComponent2 == 'HPLabel3') {
      this.props.value = `冬の不思議`;
      this.props.style = `color: white;
      font-size: 40px;
      width: 600px;position:absolute;top:27.500000000000004%;left:43.046875%;`;
    } else {
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    }
  }

  onDragEnded($event: CdkDragEnd) {
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(
      ((this.mousePositionXV2 + this.dagaX - this.theX) / 1280) * 100
    );
    this.updateDataEventY.emit(
      ((this.mousePositionYV2 + this.dagaY - this.theY) / 720) * 100
    );
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'label' + date.toString();
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
    let tmpHtmlCode = '<label';
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

    tmpHtmlCode += '>' + this.props.value + '</label>';

    return tmpHtmlCode;
  }
}
