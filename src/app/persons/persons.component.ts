import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
// import { PERSONS } from '../mock-persons';
import { PersonService } from '../person.service';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  // persons = PERSONS;(有代替)
  persons: Person[];
  selectedPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }
  getPersons(): void {
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }

  onSelect(person: Person) {
    this.selectedPerson = person;
  }
  add(name: string): void {
    if (!name) {return ; }
    // { name } as Person
    this.personService.addPerson({ name } as Person)
    // 成功了才push
    .subscribe(
      person => this.persons.push(person)
    );
  }

  delete(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.personService.deletePerson(person)
    .subscribe(
      // _ => this.persons = this.persons.filter(p => p !== person)
    );
  }

}
