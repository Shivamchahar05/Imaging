import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router,private dialogRef: MatDialogRef<LogoutComponent>) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem("login_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.router.navigate(['login'])
  }
  close(){
  this.dialogRef.close();
  }

}
