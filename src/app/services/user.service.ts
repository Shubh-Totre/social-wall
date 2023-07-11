import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http:HttpClient) { }

  user:any;

  public createNewUSewr(dataObj:any){
    return new Promise((resolve,reject)=>{
      this.Http.post(environment.APIurl.link,dataObj).subscribe({
        next:(data)=>{
          resolve(data);
        },
        error:(err)=>{
          reject(err);
        }
      });
  });
}
public getUser(email:any){
  return new Promise((resolve,reject)=>{
    this.Http.get('http://localhost:3000/user?Email=' +email).subscribe({
      next:(data)=>{
        resolve(data);
      },
      error:(err)=>{
        reject(err);
      }
  })
});
}

}
