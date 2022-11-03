import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  @ViewChild('f', { static: false }) userForm: NgForm;
  editmode: boolean = false;
  editedItem: RoleElements = null;

  ELEMENT_DATA: RoleElements[] = [
    { name: 'Admin', description: 'Role Description', activeUsers: 0 },
    { name: 'Consumer', description: 'Role Description', activeUsers: 0 },
    { name: 'Data steward', description: 'Role Description', activeUsers: 0 },
  ];

  displayedColumns: string[] = ['name', 'description', 'activeUsers', 'action'];
  dataSource = new MatTableDataSource<RoleElements>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {}

  ngOnInit(): void {
    const isData = localStorage.getItem('role');
    if (!isData) {
      localStorage.setItem('role', JSON.stringify(this.ELEMENT_DATA));
      console.log('role');
    }
    this.getRole();
  }

  getRole() {
    const isData = localStorage.getItem('role');

    if (isData != null) {
      const localData = JSON.parse(isData);
      this.dataSource = new MatTableDataSource(localData);
    }
  }
  addRole(data: RoleElements) {
    const isData = localStorage.getItem('role');
    if (data && isData != null) {
      const localData = JSON.parse(isData);
      localData.push({ ...data, activeUsers: 0 });
      localStorage.setItem('role', JSON.stringify(localData));
      this.dataSource = new MatTableDataSource(localData);

      this.getRole();
    }
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    if (!this.editmode) {
      this.addRole({ ...value });
    } else {
      console.log(this.editedItem);
      this.updateRoleList({ ...value });
    }

    form.reset();
    this.editmode = false;
    this.editedItem = null;
  }

  EditItem(element: RoleElements) {
    this.editmode = true;
    this.editedItem = element;
    this.userForm.setValue({
      ...element,
    });
  }

  deleteItem(givenElement: RoleElements) {
    const isData = localStorage.getItem('role');
    if (isData != null) {
      const localData = JSON.parse(isData);
      const updatedRole = localData.filter((element: RoleElements) => {
        return element.name != givenElement.name;
      });
      localStorage.setItem('role', JSON.stringify(updatedRole));
      this.dataSource = new MatTableDataSource(updatedRole);
    }
  }

  updateRoleList(data: RoleElements) {
    const isData = localStorage.getItem('role');
    if (isData != null) {
      const localData = JSON.parse(isData);
      const updateduser = localData.filter((element: RoleElements) => {
        return element.name != this.editedItem.name;
      });
      const finalUser = [{ ...data, activeUsers: 0 }, ...updateduser];
      localStorage.setItem('role', JSON.stringify(finalUser));
      this.dataSource = new MatTableDataSource(finalUser);
    }
  }
}

export interface RoleElements {
  name: string;
  description: string;
  activeUsers: number;
}
