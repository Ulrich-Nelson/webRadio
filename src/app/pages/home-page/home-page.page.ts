import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  @ViewChild('logo', {static: false}) logo: ElementRef;
  @ViewChild('footer', {static: false}) footer: ElementRef;


  constructor(
    private animationCtrl : AnimationController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const logoAnimation: Animation = this.animationCtrl.create()
    .addElement(this.logo.nativeElement)
    .duration(1500)
    .fromTo('transform', 'translateY(40px)', 'translateY(0px)')
    .fromTo('opacity', '0', '1');
    logoAnimation.play();


    const footerAnimation: Animation = this.animationCtrl.create()
    .addElement(this.footer.nativeElement)
    .duration(1500)
    .fromTo('transform', 'translateY(40px)', 'translateY(0px)')
    .fromTo('opacity', '0', '1');
    footerAnimation.play();

  }

}
