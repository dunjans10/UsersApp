/*/import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private userService:UsersService) { }

 /* resolve() {
    return this.userService.getUsers().pipe(map(users => users))
  }
}
*/
