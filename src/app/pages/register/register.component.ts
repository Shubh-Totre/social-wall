import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

      constructor(private fb:FormBuilder, public userService:UserService, private router:Router) { }

      ngOnInit(): void {
      }

      registerForm= this.fb.group({
        Name: ['',[Validators.required, Validators.maxLength(10)]],
        Email: ['',[Validators.required, Validators.email]],
        Password: ['',[Validators.required, Validators.minLength(6)]]
      });

      create(){
        this.userService.createNewUSewr(this.registerForm.value).then((Response)=>{
          console.log(Response);
          this.userService.user = Response;
          localStorage.setItem("user",JSON.stringify(Response));
          this.router.navigate(['/posts']);
        })
        .catch((error)=>{
          console.log(error);
        })
      }
    }
