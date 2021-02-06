import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private localNotifications: LocalNotifications, private authService: AuthService, private router: Router, private alertCtrl: AlertController) {

  }
  

  async logOut(): Promise<void> {
    this.authService.logOutUser().
      then(
        () => {
          this.router.navigateByUrl('home');
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
