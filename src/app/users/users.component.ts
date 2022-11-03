import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit , AfterViewInit {
  @ViewChild('f', { static: false }) userForm: NgForm;
  editmode:boolean = false
  editedItem:any = null
  role:string[] = []

  ELEMENT_DATA: PeriodicElement[] = [
    {name:'mark',role:"Admin",dateOfBirth:"2022-11-02" ,address:"bidar" },
    {name:'jerry',role:"Consumer",dateOfBirth:"2022-11-02" ,address:"bidar" },
    {name:'sandy',role:"DataSteward",dateOfBirth:"2022-11-02" ,address:"bidar" },
  ];
  
  displayedColumns: string[] = ['name', 'role', 'dateOfBirth', 'address', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    const editItem = localStorage.getItem('editItem')
    if (editItem) {
      const user = JSON.parse(editItem)
      this.editmode = true;
      this.editedItem = user
     setTimeout(() => {
      this.userForm.setValue({...user})
     }, );
     localStorage.removeItem('editItem')
    }
    
  }
 
  constructor( ) { }


  ngOnInit(): void {
    const   isData = localStorage.getItem('user')
    const isRole = localStorage.getItem('role')
    if (isData == null) {
      localStorage.setItem('user' , JSON.stringify(this.ELEMENT_DATA))
    }
    if (isRole) {
      let role = JSON.parse(isRole)
      role.map((role:any) => {
        this.role.push(role.name)
      })
    }
  
   
   this.getuser()
  }

  

  getuser(){
    const   isData = localStorage.getItem('user')

    if (isData != null) {
      const localData = JSON.parse(isData)
      this.dataSource= new MatTableDataSource(localData)
      console.log('got trigred' , this.dataSource.filteredData)
    }
  }
 
  addUser(data:PeriodicElement){
    const   isData = localStorage.getItem('user')
    if (data && isData !=null) {
      const localData = JSON.parse(isData)
      localData.push({...data})
      localStorage.setItem('user' , JSON.stringify(localData))
      this.dataSource= new MatTableDataSource(localData)

      this.getuser()
    }
  }

  onSubmit(form:NgForm){
    const value = form.value
    if (!this.editmode) {
      this.addUser({...value,}) 
    }
    else{
     console.log(this.editedItem);
     this.updateUserList({...value})
    }
    
    form.reset()
    this.editmode = false
    this.editedItem = null
  }

  EditItem(element:any){
    this.editmode = true
    this.editedItem = element
    console.log(element);
    this.userForm.setValue({
      
      ...element
    })
    
  }
  
   deleteItem(givenElement:any){
    const   isData = localStorage.getItem('user')
    if (isData != null) {
    const localData = JSON.parse(isData)
    const updateduser = localData.filter((element:any) => {
      return element.name != givenElement.name
    })
    localStorage.setItem('user' , JSON.stringify(updateduser))
    this.dataSource= new MatTableDataSource(updateduser)

  }}

  
  updateUserList(data:any){
    const   isData = localStorage.getItem('user')
    if (isData != null) {
    const localData = JSON.parse(isData)
    const updateduser = localData.filter((element:any) => {
      return element.name !=this.editedItem.name
    })
    const finalUser = [data , ...updateduser ]
    localStorage.setItem('user' , JSON.stringify(finalUser))
    this.dataSource= new MatTableDataSource(finalUser)

    console.log(finalUser, "finaluser" , )
    }
    
  }

  
}



export interface PeriodicElement {
  name: string;
  role: string;
  dateOfBirth: string;
  address: string;
}

