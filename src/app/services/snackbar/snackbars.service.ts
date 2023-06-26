import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarsService {

  constructor( private snack:MatSnackBar) { }


  openSnackBar(message:any,action:string,theme:string) {
    // this.spinner=false
    this.snack.open(message, action ,{
      horizontalPosition: 'center',
      verticalPosition:'top',
      duration:3000,
      panelClass:[theme]
    });
  }
}
