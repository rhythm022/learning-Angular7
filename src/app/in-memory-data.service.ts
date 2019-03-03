import { Injectable } from '@angular/core';
import { Person } from './person';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb() {
    const persons = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Mr. A' },
      { id: 13, name: 'Mr. B' },
      { id: 14, name: 'Mr. C' },
      { id: 15, name: 'Mr. ABC' },
      { id: 16, name: 'Mr. Sampe' },
      { id: 17, name: 'Mr. John' },
    ];

    return {persons};
  }

  getId(persons: Person[]): number {
    return persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 11;
  }
}
