import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    @Input() collapsed = false;
    @Input() screenWidth = 0;

    canShowSearchAsOverlay = false;
    selectedLanguage:any;


    constructor(
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.checkCanShowSearchAsOverlay(window.innerWidth);
    }

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
          // Only execute this code in the browser
          this.checkCanShowSearchAsOverlay(window.innerWidth);

      }

    }
    
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

    checkCanShowSearchAsOverlay(innerWidth: number): void {
      if (innerWidth < 768) {
        this.canShowSearchAsOverlay = true;
      }
      else {
        this.canShowSearchAsOverlay = false;
      }
    }


}