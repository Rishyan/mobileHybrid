import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  searchTitle = '';
  movieApiUrl = '';
  movieData = {
    title: '',
    description: '',
    imageUrl: ''
  }

  constructor(public http: HttpClient, private localNotifications: LocalNotifications, private authService: AuthService, private router: Router, private alertCtrl: AlertController) {
    
  }

  searchMovie() {
    const search = encodeURIComponent(this.searchTitle).trim();
    console.log('Recherche du film ' + search);
    this.movieApiUrl = 'https://www.omdbapi.com/?apikey=c19a1431&t=' + search
    this.readApi(this.movieApiUrl)
    .subscribe((data) => {
      console.log(data);
      this.movieData.title = data['Title'];
      this.movieData.description = data['Plot'];
      this.movieData.imageUrl = data['Poster'];
    });
  }
  
  readApi(URL: string) {
    return this.http.get(URL);
  }

  async logOut(): Promise<void> {
    this.authService.logOutUser().
      then(
        () => {
          this.router.navigateByUrl('login');
        },
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'ok', role: 'cancel' }]
          });
          await alert.present();
        }
      );
  }

  registerNotifications(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      } 
    })
  }

}
