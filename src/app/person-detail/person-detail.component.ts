import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person } from '../person';
// 直接向PersonService询问Person对象，而不是向其他组件(父组件)询问
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  // 只需要新建一个组件然后下述②
  // @Input()
  // selectedPerson: Person;
  selectedPerson: Person;
  constructor(
    private activeRoute: ActivatedRoute,
    private personService: PersonService,
    private location: Location,

  ) { }

  ngOnInit() {
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
    .subscribe(person => this.selectedPerson = person);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.personService.updatePerson(this.selectedPerson)
    // 成功了才goBack
    .subscribe(
      _ => this.goBack()
    );
  }

}
