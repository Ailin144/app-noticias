import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Result } from 'src/app/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
// import { Result } from 'src/app/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  @ViewChild(IonInfiniteScroll, { static:true}) infiniteScroll!: IonInfiniteScroll

  public results: Result [] = [];
       
  constructor( private newsService: NewsService ) {}
    
  ngOnInit(){
    this.newsService.getTopHeadlines()
      .subscribe( results => this.results.push(...results))
       
      
      
  }
  loadData( ){
    this.newsService.getTopHeadlinesByCategory( 'business', true)
      .subscribe( results => {
        if(results.length === this.results.length){
          this.infiniteScroll.disabled = true
          // event?.target.disabled = true;
          return;
        }
        this.results = results;
        this.infiniteScroll.complete();
        // event.target.complete();
          
        
        
    })
}
}
