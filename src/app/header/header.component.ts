import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    @Input() collapsed = false;
    @Input() screenWidth = 0;

    constructor() {} 

    ngOnInit(): void {}
  
    getHeadeClass(): string 
    {
      let styleClass = '';

      if (this.collapsed && this.screenWidth > 768) {
        styleClass = 'head-trimmed';
      } else {
        styleClass = 'head-md-screen';
      }
      return styleClass;
    }


}