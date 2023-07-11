import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private fb:FormBuilder, public userService:UserService, private snackbar:MatSnackBar, private router:Router) { }

    ngOnInit(): void {
    }

    loginForm = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(6)]],

    });

    login(){
      this.userService.getUser(this.loginForm.value.email).then((Response:any)=>{
        console.log(Response);
        if(Response.length == 0){
          console.log("User not found");
          this.snackbar.open("User not found","Close");
        }else{
          if(Response[0].Password == this.loginForm.value.password){
            console.log("Login Success");
            this.snackbar.open("Login Success","Close");
            this.userService.user = Response[0];
            localStorage.setItem('user',JSON.stringify(Response[0]));
            this.router.navigate(['/posts']);
          }else{
            console.log("Invalid Password");
            this.snackbar.open("Invalid Password","Close");
          }
        }
      })
      .catch((err)=>{
        console.log(err);
      });

    }

}
