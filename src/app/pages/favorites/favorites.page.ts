import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRange } from '@ionic/angular';
import { Favorites } from 'src/app/interfaces.ts/Favorites';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
@ViewChild("range", {static: false}) range: IonRange;

//Liste des songs ajoutées
  public  songs = [
    {
    title: "Le pire",
    singer: "Gims"
    ,img: "../assets/images/gims.PNG",
    path: "../assets/songs/gims-le-pire.mp3"},
    {
    title: "Juste une photo",
    singer: "M-Pokora",
    img: "../assets/images/pokora.PNG",
    path: "../assets/songs/m-pokora.mp3",
    },
    {title: "Rita Ora",
    singer: "Your song",
    img: "../assets/images/rita.PNG",
    path: "../assets/songs/rita-ora.mp3"
    }
    ,
    {title: "Mon frère",
    singer: "Soprano & Black-M",
    img: "../assets/images/Soprano.PNG",
    path: "../assets/songs/soprano.mp3"
    },
    {title: "Maintenant",
    singer: "Tal & Dry",
    img: "../assets/images/tal.PNG",
    path: "../assets/songs/tal.mp3"
    }
    ,
    {title: "Maintenant",
    singer: "Rihanna & TI",
    img: "../assets/images/rihanna.PNG",
    path: "../assets/songs/rihanna.mp3"
    },
    {title: "Maintenant",
    singer: "Rihanna & TI",
    img: "../assets/images/rihanna.PNG",
    path: "../assets/songs/rihanna.mp3"
    }

    ];


//détails sur le song courant
currTitle: string;
currSinger: string;
currImage: string;
//barre de progression
progress : any = 0;
// Mettre la musique en pause ou pas
isTouched : boolean = false;
isPlaying : boolean = false;
// temps d'écoute de la musique
currSecsText: any;
durationText: any;
//ion Current value
currRangeTime: any;
maxRangeValue: any;
//current song
currSong : HTMLAudioElement;
//Upnext song details
upNextImg:string;
upNextTitle:string;
upNextSubtitle:string;


//Récupération des songs en favorites
favoriteData: Favorites


  constructor( public alertController : AlertController, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService, private formBuilder: FormBuilder, private toastMessage: ToastMessageService)
     { }

  ngOnInit() {
    this.getFavoriteSongAction();
  }


/*----RECUPERATION DES SONGS MIS EN FAVORITES------*/
  async getFavoriteSongAction(): Promise<void>{
  this.authservice.getFavoriteSong(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.favoriteData = data
    console.log(this.favoriteData)
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  })
}







/*----JOUER LES MUSIQUES MIS EN FAVORITES------*/

//play song
playSong(title: string, singer: string, img: string, song: any){
  if (this.currSong != null) {
    this.currSong.pause();
  }
  //open full player view
  document.getElementById("fullPlayer").style.bottom = "0px";
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
    var index = this.songs.findIndex(x => x.title == this.currTitle);
    //if current song is the last one then set first song info for upnext song
    if ((index + 1) == this.songs.length) {
      this.upNextImg = this.songs[0].img;
      this.upNextTitle = this.songs[0].title;
      this.upNextSubtitle = this.songs[0].singer;
    }
    //else set next song info for upnext song
    else {
      this.upNextImg = this.songs[index + 1].img;
      this.upNextTitle = this.songs[index + 1].title;
      this.upNextSubtitle = this.songs[index + 1].singer;
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
  var index = this.songs.findIndex(x => x.title == this.currTitle);
  if ((index + 1) == this.songs.length) {
    this.playSong(this.songs[0].title, this.songs[0].singer, this.songs[0].img, this.songs[0].path);
  }
  else {
    var nextIndex:number = index + 1;
    this.playSong(this.songs[nextIndex].title, this.songs[nextIndex].singer, this.songs[nextIndex].img, this.songs[nextIndex].path);
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
  var index = this.songs.findIndex(x => x.title == this.currTitle);
  if (index == 0) {
    var lastIndex = this.songs.length - 1;
    this.playSong(this.songs[lastIndex].title, this.songs[lastIndex].singer, this.songs[lastIndex].img, this.songs[lastIndex].path);
  }
  else {
    var prevIndex = index - 1;
    this.playSong(this.songs[prevIndex].title, this.songs[prevIndex].singer, this.songs[prevIndex].img, this.songs[prevIndex].path);
  }
}



}
