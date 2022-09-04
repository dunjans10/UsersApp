import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { first } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  loading = this.loader.loading;
  userForm!: FormGroup;
  newUser!:User;
  isAddMode!:boolean;
  id!:number;
  genders:string[] = ['male', 'female'];
  statuses:string[] = ['active', 'inactive'];

  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private userService:UsersService,
    public loader:LoadingService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      gender:['', Validators.required],
      status:['', Validators.required]
    });

    if(!this.isAddMode) {
      this.userService.getUserById(this.id).pipe(first())
      .subscribe(
        (user) => this.userForm.patchValue(user)
      )
    }
  }

  onSubmit() {
    if (this.isAddMode) {
      this.saveUser();
    } else {
      this.updateUser();
    }
  }

  cancel() {
    this.router.navigate(['/users'])
  }

  saveUser() {
    if(this.userForm.valid){
      this.newUser = this.userForm.value;
      this.userService.addUser(this.newUser)
      .subscribe(
        (data) => {
          this.router.navigate(['/users']);
          this.newUser = data
          console.log(data);
        },
        (err:any)=> console.log(err)
      )

    }
  }

  updateUser() {
    this.newUser = this.userForm.value;
    this.userService.updateUser(this.id, this.newUser)
    .subscribe(
      (data) => {
        this.router.navigate(['/users'])
      },
      (err:any)=> console.log(err)
    )

  }

}
