import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage implements OnInit {

  public activeTab: string = 'chats'

  constructor() { }

  ngOnInit() {
  }


  segmentChange(e: any){
    this.activeTab = e.target.value;
  }

}
