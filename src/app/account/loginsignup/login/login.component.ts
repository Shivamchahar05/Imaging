
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service'

import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

console.log('login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: any;
  spinner=false
  constructor(private _fb: FormBuilder,
     private router: Router,
      private login: ApiservicesService,
       public dialog: MatDialog,
      private snack :BarsnackService
       ) {
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signInForm = this._fb.group({
      email: [null, [Validators.required,Validators.email, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      password: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
    });
  }
  get formControls() {
    return this.signInForm.controls;
  }


  nextpage() {
    if (this.signInForm.valid) {
    const loginform = this.signInForm.value
    loginform["phone_id"] = btoa(this.signInForm.value),
    loginform["liviaapp-apiversion"]=2,
    loginform["os_type"] = 3;
      this.spinner=true
      this.login.login(loginform).subscribe((res) => {
        this.spinner=false
        console.log(res)
        if (res.user_status == "6" || res.user_status == "1") {
          localStorage.setItem('login_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          sessionStorage.setItem("session-token", res.refresh_token)
          console.log("failsssssssssssssss");
          if(res.user.status_name == "In registration process"){
            this.router.navigate(['/registervalidate']);
            console.log("usersuccess"); 
          }
          if(res.user.status_name == "Active"){
            console.log("byeeeeee");
            
          this.router.navigate(['/layout/imagingrequest'])
          }
        }
      },err =>{
          this.snack.openSnackBar(err.error.messages[0],'close ','red-snackbar');
        this.spinner=false
          console.log(err.error.messages[0],"meeeee");
          
      })

    }
  }

  forgetpassword(){
    const dialogRef = this.dialog.open(ForgetpasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}





