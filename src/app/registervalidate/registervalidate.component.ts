import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-registervalidate',
  templateUrl: './registervalidate.component.html',
  styleUrls: ['./registervalidate.component.scss']
})
export class RegistervalidateComponent implements OnInit {
  request=true;
  reports=false;
  clims=false;
  test=false;

  constructor(private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  labrequest(){
    this.request=true;
    this.reports=false;
    this.clims=false;
    this.test=false;
  }
  labreport(){
     this.reports=true;
     this.request=false;
     this.clims=false;
     this.test=false;
  }
  eclims(){
    this.clims=true;
    this.request=false;
    this.test=false;
    this.reports=false;
  }
  labtest(){
    this.test=true;
    this.request=false;
    this.clims=false;
    this.reports=false;
  }
  layout(){
  }
  logout(){
    const dialogRef = this.dialog.open(LogoutComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  profile(){
   }

}
