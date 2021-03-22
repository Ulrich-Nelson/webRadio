import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

// @ViewChild(IonTabs) tabs: IonTabs
// selected = "";
// progress = 42;
  constructor() { }

  ngOnInit() {
  }

  //Changer la couleur des boutons
  // setSelectedTab(){
  //   this.selected = this.tabs.getSelected();
  // }
}
