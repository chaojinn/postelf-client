import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statuspanel',
  templateUrl: './statuspanel.component.html',
  styleUrls: ['./statuspanel.component.scss'],
})
export class StatusPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (document.querySelector('app-statuspanel') as HTMLElement).style.display = 'inline-block';
    (document.querySelector('app-statuspanel') as HTMLElement).style.position = 'absolute';
    (document.querySelector('app-statuspanel') as HTMLElement).style.width = 'calc( 100% - 240px)';
  }
}
