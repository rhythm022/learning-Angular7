import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//MesssageService类与MessageComponent类，PersonService类的关系完全不同
export class MessageService {
  messages: string[] = [];
  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
