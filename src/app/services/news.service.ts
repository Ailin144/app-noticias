import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewResponse , Result, ResultsByCategoryAndPage } from '../interfaces';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import { storedResultsByCategory } from '../data/mock-news';



const apiKey  = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private resultsByCategoryAndPage: ResultsByCategoryAndPage  |any = storedResultsByCategory;



  constructor(private http: HttpClient ) { }
  
  
  public executeQuery<T>( endpoint: string ) {
    console.log('Peticion HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params:{
        apiKey: apiKey
      }
    })
  }



  getTopHeadlines():Observable<Result[]> {

    // return this.executeQuery<NewResponse>(`api/1/news?&language=es&category=business`)
    //   .pipe(
    //   map(({results}) => results)
    // );
    return this.getTopHeadlinesByCategory('business');
  }
  getTopHeadlinesByCategory (category: string, loadMore:boolean = false): Observable<Result[]> {


    return of(this.resultsByCategoryAndPage[category].results);

    // if (loadMore){
    //   return this.getResultsByCategory(category);
    // }
// Para llamar a la api lo commente por que ahora utlizo las noticias de data
// (no realizo el fecth de los datos ya que  utilizo el localhost ,, API no es gratuita por loq que 
  // no se puede utitilizar en hosting video 130)

    if ( this.resultsByCategoryAndPage[category] ) {
      if (loadMore){
        return this.getResultsByCategory(category);
      }else{
        return of(this.resultsByCategoryAndPage[category].results);
      }
    } 

    return this.getResultsByCategory(category);
    
  }
  
  private getResultsByCategory( category:string): Observable<Result[]>{

    if( Object.keys(this.resultsByCategoryAndPage).includes(category) ) {
      // this.resultsByCategoryAndPage[category].page +=0;
    } else {
      this.resultsByCategoryAndPage[category] = {
        page: 0 ,
        results: []
      }
    }
    const page = this.resultsByCategoryAndPage[category].page ;
    const nextPage = page<=0?'':`&page=${page}`;// En caso de que sea la pagina inicial no mandar parametro de pagina

    return this.executeQuery<NewResponse>(`api/1/news?&language=es&category=${ category }${ nextPage }`)
      .pipe(
        map( ( result ) => {
          console.log(result)
          const {results,nextPage} = result;

          if (results.length === 0 ) return this.resultsByCategoryAndPage[category].results;

          this.resultsByCategoryAndPage[category] = {
            page: Number(nextPage ),
            results: [ ...this.resultsByCategoryAndPage[category].results, ...results]
          }
          return this.resultsByCategoryAndPage[category].results;
        })
      );

  }

}
