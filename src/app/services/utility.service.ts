import { inject, Injectable } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular/standalone"
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) { }
  dialogOpener = async (comp: any, valueCB: (r: any) => any, noValueCB?: any, componentProps?: { [key: string]: any } | any, cssClass?: string | string[]) => {
    const modal = await this.modalCtrl.create({
      component: comp,
      componentProps,
      cssClass
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      valueCB(data);
    } else noValueCB();
  };
  async info(message: string, header?: string) {
    const alert = await this.alertCtrl.create({
      header: header || 'Info',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
