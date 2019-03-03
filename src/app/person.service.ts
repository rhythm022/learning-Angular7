import { Injectable } from '@angular/core';
import { Person } from './person';
import { PERSONS } from './mock-persons';
import { Observable, of, Observer } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'appliacation/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personsURL = 'api/persons';
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
    ) { }

  getPersons(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.personsURL)
    .pipe(
      tap(_ => this.log('fetched persons')),
      catchError(this.handleError('getPersons', []))
    );
  }

  getPerson(id: number): Observable<Person> {
    const  url = `${this.personsURL}/${id}`;
    return this.httpClient.get<Person>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`, undefined))
    );
  }

  updatePerson(person: Person): Observable<Person> {
    return this.httpClient.put(this.personsURL, person, httpOptions)
    .pipe(
      tap(_ => this.log(`update person id=${person.id}`)),
      catchError(this.handleError<any>('updatePerson', undefined))
    );
  }

  addPerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.personsURL, person, httpOptions)
    .pipe(
      tap((newPerson: Person) => this.log(`added person w/ id=${newPerson.id}`)),
      catchError(this.handleError<Person>('addPerson', undefined))
    );
  }
  deletePerson(person: Person|number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.personsURL}/${id}`;

    return this.httpClient.delete<Person>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson', undefined))
    );
  }

  searchPersons(term: string): Observable<Person[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<Person[]>(`${this.personsURL}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found persons matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPersons', []))
    );
  }

  private log(msg: string) {
    this.messageService.add(`PersonService: ${msg}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
