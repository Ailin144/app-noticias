import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Platform , ActionSheetController, ActionSheetButton} from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent   {
  
  @Input() result!: Result;
  @Input() index!: number;

  constructor (  
    private iab: InAppBrowser,
    private platform: Platform ,
    private actionSheetCtrl:  ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService,
    
  ){}
 
  openResult(){

    if (this.platform.is('ios')|| this.platform.is('android') ){
      const browser = this.iab.create(this.result.link);
      browser.show();
    }
    
    window.open(this.result.link, '_blank');
  }

  async onOpenMenu(){

    const resultIinFavorite = this.storageService.resultInFavorites(this.result);

    const normalBtns: ActionSheetButton[] = [
      {
        text: resultIinFavorite? 'Remover favorito': 'Favorito',
        icon: resultIinFavorite? 'heart':'heart-outline',
        handler:() => this.onToggleFavorite()
      },
      {
        text:'Cancelar',
        icon:'close-outline',
        role: 'cancel'
      }
    ]

    const shareBtn: ActionSheetButton = {
      text:'Compartir',
      icon:'share-outline',
      handler:() => this.onShareResult()
    };
    
    if (this.platform.is('ios')|| this.platform.is('android') ){
    // if (this.platform.is('capacitor') ) {
      normalBtns.unshift(shareBtn);
      console.log('hello compartir' )
    }
      
    const actionSheet =  await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });
    
    
    await actionSheet.present();
  }

  onShareResult(){
    const{ title, source_id, link} = this.result;
    
    this.socialSharing.share(
      title,
      source_id,
      undefined,
      link
    )
    // this.CompartirNoticia();
    
  }
  onToggleFavorite(){
    this.storageService.saveRemoveResult(this.result);
  }
  // CompartirNoticia(){

  //   if (this.platform.is('cordova') ) {
  //     this.socialSharing.share(
  //       this.result.title,
  //       this.result.source_id,
  //       // null,
  //       this.result.link
  //     );
  //   }else {
  //     if (navigator.share) {
  //       navigator.share({
  //         title: 'this.result.title,',
  //         text: 'this.result.description',
  //         url: 'this.result.link'
  //       })
  //         .then(() => console.log('Successful share'))
  //         .catch((error) => console.log('Error sharing', error));
  //     }else{
  //       console.log('no se puede compartir')
  //     }
    

    // }
   
  // }
}
