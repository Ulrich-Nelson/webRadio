import { Component, OnInit, ViewChild} from '@angular/core';
import { AlertController, IonRange } from '@ionic/angular';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
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

//Récupération des songs en favorites
public favoriteData: any
  idSong: any;


  constructor( public alertController : AlertController, private authservice: AuthCustomerService,
 private toastMessage: ToastMessageService)
     { }

  ngOnInit() {
    this.getFavoriteSongAction();
  }


/*----RECUPERATION DES SONGS MIS EN FAVORITES------*/
  async getFavoriteSongAction(): Promise<void>{
  this.authservice.getFavoriteSong(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.favoriteData = data.favorites
    console.log(this.favoriteData)
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  })
}


/*--------------COFIRMATION DE SUPPRESSION D'UNE MUSIQUE EN FAVORIS----------*/
async confirmdeleteSong(idSong: string) {
  this.idSong = this.idSong
  const alert = await this.alertController.create({
    cssClass: 'my-customdeleteSong-class',
    header: 'are you sure you want to remove this music from your favorites?',
    message: '',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.toastMessage.presentToast("Deletion canceled", "light")
        }
      }, {
        text: 'Yes',
           handler: async () => {
          this.authservice.deleteOneFavoriteSong(await this.authservice.getToken(), idSong)
          .pipe()
          .subscribe(() =>{
          console.log(idSong)
            this.toastMessage.presentToast("This music has been successfully deleted", "success")
          },
          (error) => {
            this.toastMessage.presentToast(error.error.message, "warning")
          }
          );
        }
      }
    ]
  });

  await alert.present();
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
    var index = this.favoriteData.findIndex((x: { title: string; }) => x.title == this.currTitle);
    //if current song is the last one then set first song info for upnext song
    if ((index + 1) == this.favoriteData.length) {
      this.upNextImg = this.favoriteData[0].cover;
      this.upNextTitle = this.favoriteData[0].title;
      this.upNextSubtitle = this.favoriteData[0].artist;
    }
    //else set next song info for upnext song
    else {
      this.upNextImg = this.favoriteData[index + 1].cover;
      this.upNextTitle = this.favoriteData[index + 1].title;
      this.upNextSubtitle = this.favoriteData[index + 1].artist;
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
  var index = this.favoriteData.findIndex((x: { title: string; }) => x.title == this.currTitle);
  if ((index + 1) == this.favoriteData.length) {
    this.playSong(this.favoriteData[0].title, this.favoriteData[0].artist, this.favoriteData[0].cover, this.favoriteData[0].url);
  }
  else {
    var nextIndex:number = index + 1;
    this.playSong(this.favoriteData[nextIndex].title, this.favoriteData[nextIndex].artist, this.favoriteData[nextIndex].cover, this.favoriteData[nextIndex].url);
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
  var index = this.favoriteData.findIndex((x: { title: string; }) => x.title == this.currTitle);
  if (index == 0) {
    var lastIndex = this.favoriteData.length - 1;
    this.playSong(this.favoriteData[lastIndex].title, this.favoriteData[lastIndex].artist, this.favoriteData[lastIndex].cover, this.favoriteData[lastIndex].url);
  }
  else {
    var prevIndex = index - 1;
    this.playSong(this.favoriteData[prevIndex].title, this.favoriteData[prevIndex].artist, this.favoriteData[prevIndex].cover, this.favoriteData[prevIndex].url);
  }
}






}



