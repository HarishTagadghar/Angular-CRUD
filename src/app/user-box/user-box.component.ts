import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  @Input() user:any;
  @Output() deleteUser = new EventEmitter<any>()
  constructor( private router : Router) { }
  
  ngOnInit(): void {
  }


Delete(user: any){
 
  this.deleteUser.emit(user)
}

editUser(user:any){
  localStorage.setItem('editItem' , JSON.stringify(user))
  this.router.navigate(['./users'])
}
}