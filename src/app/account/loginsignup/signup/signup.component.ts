import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';


import { SignupsnackbarComponent } from './dialogbox/signupsnackbar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private signup1: ApiservicesService,
    public dialog: MatDialog,
    private bar: BarsnackService) { }

  signupForm!: FormGroup
  spinner = false
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.fb.group({
      name_prefix: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      country_code: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern("^[7][9][0-9]{7}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],

    })

  }
  openDialog() {
    const dialogRef = this.dialog.open(SignupsnackbarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  link() {
    if (this.signupForm.valid) {
      this.spinner = true
      const form = this.signupForm.value;
      form["phone_code"] = 254,
        form["phone_id"] = btoa(this.signupForm.controls.phone_number.value),
        form["os_type"] = 3,
        form["server_path"] = "http://localhost:4200/",
        localStorage.setItem("phone_id", form.phone_id)
      this.signup1.signup1st(form).subscribe((res) => {
        this.spinner = false
        console.log(res)
        if (res.code == 200) {
          this.openDialog()
          console.log("hi shivam");

        }
        if (res.code == 400) {
          this.bar.openSnackBar(res.messages, 'close ', 'red-snackbar');
        }

      }, err => {

      })
    }

  }

}