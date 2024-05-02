import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { NewsService } from '../../services/news.service';
import { Result } from 'src/app/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild( IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;

  public categories:string[] =[
  'business',
  'crime',
  'domestic',
  'education',
  'entertainment',
  'environment',
  'food',
  'health',
  'lifestyle',
  'other',
  'politics',
  'science',
  'sports',
  'technology',
  'top',
  'tourism',
  'world'
];
public selectedCategory: string = this.categories[0];
public results: Result[] =[];
  
  constructor( private newsService: NewsService ) {}

  ngOnInit(){
    
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)  
      .subscribe( results => {
        // console.log(results)
        this.results = [ ...results ]
    })

  }
  segmentChanged(event: Event){
    
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)  
      .subscribe(results =>{
      this.results = [ ...results]
    
  })
}
  loadData( ){
    this.newsService.getTopHeadlinesByCategory( this.selectedCategory, true)
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