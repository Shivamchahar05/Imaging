import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addresspop',
  templateUrl: './addresspop.component.html',
  styleUrls: ['./addresspop.component.scss']
})
export class AddresspopComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<AddresspopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: "DialogData",) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
