import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  update = new Subject<any>();

  users:any[]= []
  constructor() { }

  ngOnInit(): void {
    const   isData = localStorage.getItem('user')
    if (isData) {
      this.users = JSON.parse(isData)
    }
  
  }
  deleteUser(user:any){
    const   isData = localStorage.getItem('user')
    if (isData != null) {
    const localData = JSON.parse(isData)
    const updateduser = localData.filter((element:any) => {
      return element.name != user.name
    })
    localStorage.setItem('user' , JSON.stringify(updateduser))
    this.users = updateduser
  }
  }
}
