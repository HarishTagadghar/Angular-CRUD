import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  @Input() user:any;
  @Output() deleteUser = new EventEmitter<any>()
  constructor() { }
  
  ngOnInit(): void {
  }


Delete(user: any){
 
  this.deleteUser.emit(user)
}
}