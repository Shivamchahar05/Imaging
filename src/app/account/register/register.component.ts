import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private signupService:ApiservicesService,
    private nav:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.patchDataApiCall();
  
  }

  patchDataApiCall() {
    let token;
    this.route.params.subscribe((event) => {
      token = event.data;
      console.log(token, 'query data');
    });
    let phoneId = localStorage.getItem('phone_id');
    const paramData = {
      access_token: token,
      os_type: 3,
      phone_id: phoneId,
    };
    this.signupService.getuserdetails(paramData).subscribe(
      (res) => {
        console.log(res, 'response from api data!');
        if (res.user_status == '1' || res.user_status == '6') {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
         this.signupService.setuserData(res.user);
        } 
      },
      (err) => {
        console.log(err, 'error from patch api');
       
      }
    );
  }

}
