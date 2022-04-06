import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { CodeComponent } from '../section/code/code.component';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  props: IProperty;
  componentList: IComponent[] = [];
  selectedcomp: IComponent;
  defaultProps: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
    type: '',
    draggable: true,
    selected: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    dummyDate:'',
    isIcon:false,
    finalStyle: ''
  };
  style2 = '';
  tempStyle = '';
  @Output() addAllCSSRule = new EventEmitter<string>();
  @Output() clearCss = new EventEmitter<string>();
  @Output() cssReceiveMessage = new EventEmitter<string>();
  @Output() clearComponentListEvent = new EventEmitter<number>();
  @Output() updateComponentListEvent = new EventEmitter<IComponent[]>();

  @Input() get property(): IProperty {
    
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
      this.style2 = this.tempStyle = this.props.style;
      setTimeout(() => {
      let regexPosition = /position(.+?);/;
      let regexPosition2 = /top(.+?);/;
      let regexPosition3 = /left(.+?);/;
      let regexPosition4 = /visibility:\s?visible;/;
      this.style2 = this.style2.replace(regexPosition, '');
      this.style2 = this.style2.replace(regexPosition2, '');
      this.style2 = this.style2.replace(regexPosition3, '');
      this.style2 = this.style2.replace(regexPosition4, '');
      
      if(this.props.typeObj == 'datepickerDrag')
        {
        this.props.dummyDate = this.datepipe.transform(this.props.value, 'MM/dd/YYYY');
        this.props.value = this.props.dummyDate.transform(this.props.value, 'YYYY/MM/dd');
         }
      }, 1);
      
    }
  }

  @Input() get compList() {
    return this.componentList;
  }
  set compList(value: IComponent[]) {
    this.componentList = value;
  }

  @Input() get selectedIdx() {
    return this.selectedcomp;
  }
  set selectedIdx(value: IComponent) {
    this.selectedcomp = value;
  }

  constructor(public sanitizer:DomSanitizer, public datepipe: DatePipe, private dialogService: DialogService) {
    this.props = this.property;
    this.componentList = this.compList;
    this.selectedcomp = this.selectedIdx;
  }

  deleteComponent() {
    let componentIndex = this.componentList.indexOf(this.selectedcomp);
    if (componentIndex !== -1) {
      this.componentList.splice(componentIndex, 1);
      this.props = this.defaultProps;
      this.styleBox.nativeElement.value = "";
      this.props.draggable = false;
    }
    this.updateComponentListEvent.emit(this.componentList);
  }

  confirmRemove() {
    this.dialogService.openConfirmDialog('This operation is ireversible.\n\
    This action will remove the selected component from canvas.\n\
    Do you want to proceed?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.deleteComponent();
      }
    });
  }



  @ViewChild('taID') styleBox: ElementRef;
  clearComponent() {
        this.componentList.length = 0;
        this.props = this.defaultProps;
        this.styleBox.nativeElement.value = "";
        this.addAllCSSRule.next("");
        this.clearCss.next("");
        this.cssReceiveMessage.next("");
        this.props.draggable = false;        
        this.clearComponentListEvent.next(0);
  }

  confirmClear() {
    this.dialogService.openConfirmDialog('This operation is ireversible.\n\
    This action will clear all the components in the canvas.\n\
    Do you want to proceed?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.clearComponent();
      }
    });
  }

      

  ngOnInit(): void {
    this.style2 = this.props.style;
  }

  idChangeHandler(event: any) {
    this.props.id = event.target.value;
  }

  valueChangeHandler(event: any) {
    
    if(this.props.typeObj == 'datepickerDrag')
    {
      setTimeout(() => {
        this.props.value = this.datepipe.transform(event.target.value, 'yyyy-MM-dd');
        this.props.dummyDate = this.datepipe.transform(this.props.value, 'MM/dd/YYYY');
        
      }, 3000);
    }
    else if(this.props.typeObj == 'linkDrag' || this.props.typeObj == 'buttonDrag')
    {
      if(this.checkIcon(event.target.value))
      {
        this.props.isIcon = true;
        this.props.value = event.target.value.slice(10, -6);
      }
      else
      {
        this.props.value = event.target.value;
      }
    }
    else
    {
      this.props.value = event.target.value;
    }
   
  }

  typeChangeHandler(event: any) {
    this.props.type = event.target.value;
  }

  styleChangeHandler(event: any) {
    let x = event.target.value;
    let topRegex = /;top:\s?\d+(\.\d+)?%/g
    let leftRegex = /;left:\s?\d+(\.\d+)?%;/g
    let topPosition = this.tempStyle.match(topRegex)?.toString();
    let leftPosition = this.tempStyle.match(leftRegex)?.toString();
    let position = 'position:absolute'
    this.props.style = position+topPosition+leftPosition+x;
    this.props.finalStyle = this.props.style;
    this.props.finalStyle=this.props.finalStyle.replace(topRegex, ';top:'+this.props.mouseDragPositionY+'%');
    this.props.finalStyle=this.props.finalStyle.replace(leftRegex, ';left:'+this.props.mouseDragPositionX+'%;')
  }
  @ViewChild('taID') styleText!: ElementRef;
  styleChangeHandler2(event: any) {
    let regexPosition = /position(.+?);/;
    let regexPosition2 = /top(.+?);/;
    let regexPosition3 = /left(.+?);/;
    this.style2 = this.style2.replace(regexPosition, '');
    this.style2 = this.style2.replace(regexPosition2, '');
    this.style2 = this.style2.replace(regexPosition3, '');
  }

  classChangeHandler(event: any) {
    this.props.class = event.target.value;
  }

  contentChangeHandler(event: any) {
    this.props.content = event.target.value;
  }
  placeholderChangeHandler(event: any) {
    this.props.placeholder = event.target.value;
  }

  rowsChangeHandler(event: any) {
    this.props.rows = event.target.value;
  }

  colsChangeHandler(event: any) {
    this.props.cols = event.target.value;
  }
  
  hrefChangeHandler(event: any){
    this.props.href = event.target.value;
  }

  nameChangeHandler(event: any) {
    this.props.name = event.target.value;
  }
  linkValueChangeHandler(event: any) {
    this.props.linkValue = event.target.value;
  }
  checkedChangeHandler(event: any) {
    this.props.checked = event.target.value;
  }
  enableDragging(event: any) {
    this.props.draggable = !this.props.draggable;
  }
  redirectionChangeHandler(event: any){
    this.props.redirection = event.target.value;
  }
  newTab(event: any) {
    this.props.target = !this.props.target;
  }  
  
  /* CODE BELOW IS FOR TABLE ELEMENT */

  tblRowsChangeHandler(event: any) {
    this.props.tblRows = event.target.value;

    if (this.props.updateCallback) {
      const { updateCallback } = this.props;
      updateCallback(this.props.tblRows, this.props.tblCols);
    }
  }
  tblColsChangeHandler(event: any) {
    this.props.tblCols = event.target.value;
    if (this.props.updateCallback) {
      const { updateCallback } = this.props;
      updateCallback(this.props.tblRows, this.props.tblCols);
    }
  }
  updateLink()
  {
       let regexPosition = /https(.+?)"/;
       let link:any = null;
       let dummyLink = this.props.value;
       var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
       if(dummyLink.charAt(dummyLink.length - 1) == ">")
       {
        link = this.props.value.match(regexPosition);
        link[0] = link[0].slice(0, -1); 
        this.props.value = link[0];
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
      }
      else if(dummyLink[0]?.charAt(dummyLink[0].length - 1) == '"')
      {
        this.props.value = this.props.value.slice(0, -1); 
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
      }
     else if(this.props.value.match(p))
      {
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
       }  
    else
      {
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://ps.w.org/all-404-redirect-to-homepage/assets/icon-128x128.png?rev=1515215');
      }
  }
  checkIcon(icon: string){
    if(icon.match(/^<i class=".*"><\/i>$/)){
      return true;
    }
    return false;
  }
  /* END OF CODE FOR TABLE ELEMENT */

  
}

