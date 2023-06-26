import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiservicesService } from '../services/Api/apiservices.service';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  imageSrc:any=""
  preview="https://staging.liviaapp.com"
  constructor(private router:Router,public dialog: MatDialog , private pic:ApiservicesService) { }

  ngOnInit(): void {
    this.userpic();
  }
  profile(){
   this.router.navigate(['/layout/profile']);
  }
  logout(){
      const dialogRef = this.dialog.open(LogoutComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

  editprofile(){
    this.router.navigate(['/layout/editprofile']);
  }

  userpic(){
    this.pic.profile().subscribe((res) => {
      this.imageSrc=res.avatar
    })
  }

}
