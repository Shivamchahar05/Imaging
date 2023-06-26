import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mappopup',
  templateUrl: './mappopup.component.html',
  styleUrls: ['./mappopup.component.scss']
})
export class MappopupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<MappopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: "DialogData",) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
