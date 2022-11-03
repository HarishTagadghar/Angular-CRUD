import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodicElement } from '../users/users.component';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  @Input() user:PeriodicElement;
  @Output() deleteUser = new EventEmitter<PeriodicElement>()
  constructor( private router : Router) { }
  
  ngOnInit(): void {
  }


Delete(user: PeriodicElement){
 
  this.deleteUser.emit(user)
}

editUser(user:PeriodicElement){
  localStorage.setItem('editItem' , JSON.stringify(user))
  this.router.navigate(['./users'])
}
}