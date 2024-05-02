import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Result } from '../interfaces';
// import { Result } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService{

  private _storage: Storage | any = null  ;
  private _localResults: Result [] = [];
  
  constructor( private storage:Storage) {
    this.init();
  }

  get getLocalResults(){
    return[ ...this._localResults];
    }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // const storage = await this.storage.create();
   const storage = await this.storage.create();
    this._storage = storage; 
    this.loadFavorites();
  }
  async saveRemoveResult (result:Result ){
    
    const exists = this._localResults.find( localResult => localResult.title === result.title);

      if (exists){
        this._localResults = this._localResults.filter(localResult => localResult.title !== result.title)
      }else{
        this._localResults = [ result, ...this._localResults ];
      }

    
    
    this._storage.set('result', this._localResults) ;
  }

  async loadFavorites(){
    try{
      const result = await this._storage.get('result');
      this._localResults = result || [];

     } catch (error) {
     }
  }
  resultInFavorites(result: Result){
    return !!this._localResults.find(localResult =>localResult.title ===result.title);


  } 
}