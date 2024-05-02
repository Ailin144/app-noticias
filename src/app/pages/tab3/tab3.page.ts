import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Result } from 'src/app/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get results():Result []{
    return this.storageService.getLocalResults;
  }
  constructor( private storageService: StorageService) {}

}
