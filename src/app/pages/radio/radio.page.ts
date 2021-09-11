import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRange } from '@ionic/angular';
import { Song } from 'src/app/interfaces.ts/songs';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})

export class RadioPage implements OnInit {
  @ViewChild("range", {static: false}) range: IonRange;

//détails sur le song courant
public currTitle: string;
public currSinger: string;
public currImage: string;
//barre de progression
public progress : any = 0;
// Mettre la musique en pause ou pas
public isTouched : boolean = false;
public isPlaying : boolean = false;
// temps d'écoute de la musique
public currSecsText: any;
public durationText: any;
//ion Current value
public currRangeTime: any;
public maxRangeValue: any;
//current song
public currSong : HTMLAudioElement;
//Upnext song details
public upNextImg:string;
public upNextTitle:string;
public upNextSubtitle:string;

//récupérer les songs du logiciel
public songsData: any[] = [];

  constructor(
    public alertController : AlertController,  private authservice: AuthCustomerService,
    private toastMessage: ToastMessageService
  ) { }

  ngOnInit() {
    this.getSongRadioAction();
    this.initRadio();
  }




/*----RECUPERATION DES SONGS DU LOGICIEL------*/
async getSongRadioAction(): Promise<void>{
  this.authservice.getSongRadio(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.songsData = data.songs
    console.log(this.songsData)
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  })
}


/*----JOUER LES MUSIQUES MIS EN FAVORITES------*/

initRadio(){
  for (let song of this.songsData) {
    console.log(song._id)
    // this.playSong(song.title, song.artist, song.cover, song.url)
    
  }
}

//play song
playSong(title: string, singer: string, img: string, song: any){
  if (this.currSong != null) {
    this.currSong.pause();
  }
  //open full player view
  //document.getElementById("fullPlayer").style.bottom = "0px";
  //set current song details
  this.currTitle = title;
  this.currSinger = singer;
  this.currImage = img;

  //Current song audio
  this.currSong = new Audio(song);
  
  this.currSong.play().then(() => {
    //Total song duration
    this.durationText = this.sToTime(this.currSong.duration);
    //set max range value (important to show proress in ion-range)
    this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));
    //set upnext song
    //get current song index
    var index = this.songsData.findIndex((x: { title: string; }) => x.title == this.currTitle);
    //if current song is the last one then set first song info for upnext song
    if ((index + 1) == this.songsData.length) {
      this.upNextImg = this.songsData[0].cover;
      this.upNextTitle = this.songsData[0].title;
      this.upNextSubtitle = this.songsData[0].artist;
    }
    //else set next song info for upnext song
    else {
      this.upNextImg = this.songsData[index + 1].cover;
      this.upNextTitle = this.songsData[index + 1].title;
      this.upNextSubtitle = this.songsData[index + 1].artist;
    }
    this.isPlaying = true;
  })

  this.currSong.addEventListener("timeupdate", () => {
    
    //update some infos as song plays on
    //if ion-range not touched the do update 
    if (!this.isTouched) {
      //update ion-range value
      this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
      //update current seconds text
      this.currSecsText = this.sToTime(this.currSong.currentTime);
      //update progress bar (in miniize view)
      this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));
      //if song ends,play next song
      if (this.currSong.currentTime == this.currSong.duration) {
        this.playNext();
      }
    }
  });
}



sToTime(t: any) {
  return this.padZero(parseInt(String((t / (60)) % 60))) + ":" +
    this.padZero(parseInt(String((t) % 60)));
}


padZero(v: any) {
  return (v < 10) ? "0" + v : v;
}


playNext() {
  var index = this.songsData.findIndex((x: { title: string; }) => x.title == this.currTitle);
  if ((index + 1) == this.songsData.length) {
    this.playSong(this.songsData[0].title, this.songsData[0].artist, this.songsData[0].cover, this.songsData[0].url);
  }
  else {
    var nextIndex:number = index + 1;
    this.playSong(this.songsData[nextIndex].title, this.songsData[nextIndex].artist, this.songsData[nextIndex].cover, this.songsData[nextIndex].url);
  }

}


maximize() {
  document.getElementById("fullPlayer").style.bottom = "0px";
  document.getElementById("miniPlayer").style.bottom = "-100px";
}

minimize() {
  document.getElementById("fullPlayer").style.bottom = "-1000px";
  document.getElementById("miniPlayer").style.bottom = "0px";
}

pause() {
  this.currSong.pause();
  this.isPlaying = false;
}

play() {
  this.currSong.play();
  this.isPlaying = true;
}

cancel() {
  document.getElementById("miniPlayer").style.bottom = "-100px";
  this.currImage = "";
  this.currTitle = "";
  this.currSinger = "";
  this.progress = 0;
  this.currSong.pause();
  this.isPlaying = false;
}

touchStart() {
  this.isTouched = true;
  this.currRangeTime = Number(this.range.value);
}

touchMove() {
  this.currSecsText = this.sToTime(this.range.value);
}


touchEnd() {
  this.isTouched = false;
  this.currSong.currentTime = Number(this.range.value);
  this.currSecsText = this.sToTime(this.currSong.currentTime)
  this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));

  if (this.isPlaying) {
    this.currSong.play();
  }
}

playPrev() {
  var index = this.songsData.findIndex((x: { title: string; }) => x.title == this.currTitle);
  if (index == 0) {
    var lastIndex = this.songsData.length - 1;
    this.playSong(this.songsData[lastIndex].title, this.songsData[lastIndex].artist, this.songsData[lastIndex].cover, this.songsData[lastIndex].url);
  }
  else {
    var prevIndex = index - 1;
    this.playSong(this.songsData[prevIndex].title, this.songsData[prevIndex].artist, this.songsData[prevIndex].cover, this.songsData[prevIndex].url);
  }
}



}


