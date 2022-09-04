import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UsersComponent } from './components/users/users.component';
//import { ResolverService } from './services/resolver.service';

const routes: Routes = [
  //{path:'users', component:UsersComponent, resolve:{users: ResolverService}},
  {path:'users', component:UsersComponent},
  {path:'users/add', component:AddUserComponent},
  {path:'users/edit/:id', component:AddUserComponent},
  {path:"", redirectTo: '/users', pathMatch:"full"},
  {path:'**', component:ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
