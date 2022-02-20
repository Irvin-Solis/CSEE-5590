import { Component } from '@angular/core';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // define list of items
  title = 'TO DO LIST FOR 2018'
  inputItem = ""
  items: Item[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        content: 'First',
        completed: false
      },
      {
        content: 'Second',
        completed: true
      },
    ]
  }

  // Write code to push new item
  submitNewItem() {
    this.items.push({
      content: this.inputItem,
      completed: false
    });

    this.inputItem =""
  }

  // Write code to complete item
  completeItem(id) {
    this.items.map((v, i) =>{
      if (i == id) v.completed = !v.completed;

      return v;
    })
  }

  // Write code to delete item
  deleteItem(id) {
    this.items = this.items.filter((v, i) => i != id);
  }

}
