import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
        {path:'', component: SearchComponent , pathMatch: 'full'  },
        {path:'users' , component:UsersComponent},
        {path:'roles' , component:RoleComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }