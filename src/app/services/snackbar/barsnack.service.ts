import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class BarsnackService {

  constructor(private bar:MatSnackBar) { }

  openSnackBar(message:any,action:string,theme:string) {
      // this.spinner=false
      this.bar.open(message, action ,{
        horizontalPosition: 'center',
        verticalPosition:'top',
        duration:3000,
        panelClass:[theme]
      });
    }


    openSnackBarres(message:any,action:string) {
      this.bar.open(message, action ,{
        horizontalPosition:'right',
        verticalPosition:'top',
        duration:2000,
        
      });
    }
}
