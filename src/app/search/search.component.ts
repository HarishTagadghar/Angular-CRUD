import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PeriodicElement } from '../users/users.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('f', { static: false }) userForm: NgForm ;

  update = new Subject<PeriodicElement>();
  users:PeriodicElement[]= []
  searchUser:PeriodicElement[]=[]
  
  ELEMENT_DATA: UserElement[] = [
    {name:'mark',role:"Admin",dateOfBirth:"2022-11-02" ,address:"bidar" },
    {name:'jerry',role:"Consumer",dateOfBirth:"2022-11-02" ,address:"bidar" },
    {name:'sandy',role:"DataSteward",dateOfBirth:"2022-11-02" ,address:"bidar" },
  ];
  
  ROLE_DATA: RoleElement[] = [
    {name:'Admin',description:"Role Description" , activeUsers: 0 },
    {name:'Consumer',description:"Role Description" , activeUsers: 0 },
    {name:'Data steward',description:"Role Description" , activeUsers: 0 },
  ];
  
  constructor() { }

  ngOnInit(): void {
    const   isData = localStorage.getItem('user')
    const isRole = localStorage.getItem('role')
    if (!isData) {
      localStorage.setItem( 'user',JSON.stringify(this.ELEMENT_DATA))
    }
    if (!isRole) {
      localStorage.setItem( 'role',JSON.stringify(this.ROLE_DATA))
    }
    
    if (isData ) {
      this.users = JSON.parse(isData)
    }
    setTimeout(() => {
      
      this.userForm.form.valueChanges.subscribe(value => {
        console.log(value ,"from sub")
        this.searchUser = []
      })
    }, );
      
  }
  deleteUser(user:PeriodicElement){
    const   isData = localStorage.getItem('user')
    if (isData != null) {
    const localData = JSON.parse(isData)
    const updateduser = localData.filter((element:PeriodicElement) => {
      return element.name != user.name
    })
    localStorage.setItem('user' , JSON.stringify(updateduser))
    this.users = updateduser
  }
  }
  onSubmit(form:NgForm){
    const    searchUser = this.users.filter((user:PeriodicElement) => {
      return user.name == form.value.name
    })
    if (searchUser.length > 0) {
      this.searchUser = searchUser
      console.log("found user", this.searchUser);
    }else{
      this.searchUser = []
    }
  }
}


export interface RoleElement {
  name: string;
  description: string;
  activeUsers: number;
}



export interface UserElement {
  name: string;
  role: string;
  dateOfBirth: string;
  address: string;
}

