import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupsnackbar',
  templateUrl: './signupsnackbar.component.html',
  styleUrls: ['./signupsnackbar.component.scss']
})
export class SignupsnackbarComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }
 
  login(){
    this.router.navigate(['login'])
  }

}
