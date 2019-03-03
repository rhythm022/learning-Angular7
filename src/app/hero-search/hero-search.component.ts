import { Component, OnInit } from '@angular/core';

import { Person } from '../person';
import { PersonService } from '../person.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  persons$: Observable<Person[]>;
  private searchTerms = new Subject<string>();
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.persons$ = this.searchTerms
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.personService.searchPersons(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
