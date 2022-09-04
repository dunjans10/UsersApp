import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersService } from './services/users.service';
//import { ResolverService } from './services/resolver.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NetworkInterceptor } from './network.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    AddUserComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    //UsersService,
    //ResolverService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:NetworkInterceptor,
      multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
