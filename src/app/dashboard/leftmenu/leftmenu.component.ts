import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss']
})
export class LeftmenuComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  menuClick(name:string){
    console.log("menuClick:"+name);
    this.menuClicked.emit(name);
  }
}
