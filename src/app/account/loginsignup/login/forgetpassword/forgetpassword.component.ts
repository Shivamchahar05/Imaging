import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';



@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  forgetpassword!:FormGroup
  constructor( private fb : FormBuilder, private forget: ApiservicesService,private nav:Router,private route:ActivatedRoute ,  private _snackBar: MatSnackBar,
    private bar:BarsnackService) { }

  ngOnInit(): void {
    this.createForm();
   
  }
  
  createForm() {
    this.forgetpassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendrest(){
    
    const form=this.forgetpassword.value
    form["server_path"]="http://localhost:4200/";
    this.forget.forgetpassword(form).subscribe((res)=> {
      this.bar.openSnackBar(res.messages,'close ','red-snackbar');
      console.log(res)
    })
  }

  
}
