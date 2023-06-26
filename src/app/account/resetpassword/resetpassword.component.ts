import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  constructor(private forget: ApiservicesService, 
    private router: Router,
     private route: ActivatedRoute,
       private fb: FormBuilder,
       private bar:BarsnackService) { }
       
  resetpass!: FormGroup;
   paramData = {
    token: '',
    email: ''
  };
  ngOnInit(): void {
    this.patchDataforget()
    this.create();
  }
  create() {
    this.resetpass = this.fb.group({
      password: [null, [Validators.required]],
      confirmpass: [null, [Validators.required]]
    });
  }

  patchDataforget() {
    let token='';
    let email=''
    this.route.params.subscribe((event) => {
      token = event.token;
      email = event.email
      console.log(token, 'query token');
      console.log(email, 'query email');

    });

    this.paramData.email=email;
    this.paramData.token=token

    this.forget.forgettocken(this.paramData).subscribe(
      (res) => {
        console.log(res, 'response from api data!');
        
      },
      (err) => {
        console.log(err, 'error from patch api');
      }
    );
  }
  reset() {
    const data = {
      token: this.paramData.token,
      email: this.paramData.email,
      password: this.resetpass.controls.password.value

    }
    this.forget.reset(data).subscribe((res) => {
      console.log(res)
      this.bar.openSnackBar(res.messages, 'close ', 'red-snackbar');
      if(res.code=200 && this.resetpass.controls.password.value==this.resetpass.controls.confirmpass.value){
        this.router.navigate(['/login'])
      }
    })
  }

}
