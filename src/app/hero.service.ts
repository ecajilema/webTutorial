import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './response';

/* 
Propiedad para mandar encabezado JSon Post
*/
const httpOption = {
  headers: new HttpHeaders ({
    'Contend-Type':'application/json'
  })
}



@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private myAppUrl='https://localhost:7012/';
  private myApiUrl='api/Hero';

  constructor(
    private messageService:MessageService,
     private _http:HttpClient) { }

  /*Get*/ 
  getHeroes():Observable<Response> {
    this.messageService.add('HeroService: fetched heroes');
   return this._http.get<Response>(this.myAppUrl + this.myApiUrl);
 
  }
/*
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }*/


/*Get Id*/

getHero(id: number): Observable<Hero | undefined> {
  const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  
  return this._http.get<Response>(url).pipe(
    map(response => {
      if (response.exito === 1) {
        return response.dato as unknown as Hero; // Conversión de tipo
      }
      throw new Error(response.mensaje || 'Error al obtener el héroe');
    }),
    catchError(error => {
      this.messageService.add(`HeroService: Error al obtener héroe id=${id}`);
      console.error(error);
      return of(undefined); // Devuelve undefined en caso de error
    })
  );
}
  /*getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }*/

  /*Post*/
  
  add(hero: Hero): Observable<Response>{
    return this._http.post<Response>(this.myAppUrl+ this.myApiUrl, hero, httpOption);
  }
  
  /*Put*/
edit(hero: Hero):Observable<Response>{
  return this._http.put<Response>(this.myAppUrl+ this.myApiUrl, hero, httpOption);
}

/*Delete*/

delete(id: number): Observable<Response> {
  return this._http.delete<Response>(`${this.myAppUrl+ this.myApiUrl}/${id}`); /*comillas Alt96*/
}

/** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

/**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


/*searchHeroes*/
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // Si no hay término de búsqueda, devuelve un array vacío
    return of([]);
  }
  
  return this._http.get<any>(`${this.myAppUrl + this.myApiUrl}/search?name=${term}`).pipe(
    // Extrae la propiedad 'dato' del objeto de respuesta
    map(response => response.dato || []),
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
  

}
