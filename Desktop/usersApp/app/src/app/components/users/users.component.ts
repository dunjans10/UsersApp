import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserTrackerError } from 'src/app/models/user-tracker-error';
import { LoadingService } from 'src/app/services/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading = this.loader.loading;
  users:User[] = [];
  userId!:number;
  user!:User;
  error:string='';
  totalRows = 0;
  pageSize = 2;
  currentPage = 1;
  dataSource: User[] = [];
  pageEvent!:PageEvent;
  displayedColumns: string[] = ['name', 'email', 'gender', 'status', 'actions'];


  constructor(
    private userService: UsersService,
    private router:Router,
    //private route:ActivatedRoute,
    public loader:LoadingService) { }

  ngOnInit(): void {
    //this.users = this.route.snapshot.data['users']

    this.getUsers()
  }
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
  }


  getUsers(){
    this.userService.getUsers(this.currentPage)
    .subscribe(
      (users:any) => this.dataSource = users,
      (err:UserTrackerError) => this.error = err.friendlyMessage,
      () => console.log(this.users)
    )
  }

  addUser(){
    this.router.navigate(['/users/add'])
  }

  updateUser(id:number):void{
    this.router.navigate(['/users/edit', id])
  }

  deleteUser(userId:number) {
    this.userService.deleteUser(userId)
    .subscribe(
     () => this.getUsers(),
    )
  }

  onPaginateChange(event:PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;
    this.userService.getUsers(page).pipe(
      map((users:any)=> this.dataSource = users)
    ).subscribe()
  }

}
