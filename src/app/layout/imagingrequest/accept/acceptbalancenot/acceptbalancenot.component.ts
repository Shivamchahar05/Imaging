import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { InsuranceDetailsComponent } from '../../insurance_details/insurance-details.component';
export interface PeriodicElement {
  select: false;
  test_name: string;
  doctor_notes: string; 
  //           </mat-checkbox>
  // status: number;
  checker:false
}

@Component({
  selector: 'app-acceptbalancenot',
  templateUrl: './acceptbalancenot.component.html',
  styleUrls: ['./acceptbalancenot.component.scss'] 
})
export class AcceptbalancenotComponent implements OnInit {
  ELEMENT_DATA!: PeriodicElement[];
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = ['select', 'test_name', 'doctor_notes', 'status'];
  lowBalance=false
  balance: any;
  id: any;
  checkbalance=false;
  retrieving=true;
  e:any
  disabledBtn=true;

  constructor(private dialogRef: MatDialogRef<AcceptbalancenotComponent>,@Inject(MAT_DIALOG_DATA) data: any,private service:ApiservicesService,private dialog:MatDialog) {
    console.log(data, "nalnclasjnl");

    this.ELEMENT_DATA = data.data.lab_requests;
    this.id=data.data.claim_id
    this.e=data
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.getuserdetails()

this.selection.changed.subscribe((item:any) => {
  this.disabledBtn = this.selection.selected.length == 0;
})
  }
  
close(){
  this.dialogRef.close()
}

getuserdetails(){
  console.log(this.id);
  
  this.service.getuserbalance(this.id).subscribe((res:any) =>{
    console.log(res);
    this.retrieving=false
    this.balance=res.user_current_balance;
    if(!this.balance){
      this.checkbalance=true;
      console.log(this.balance,"tttttt");
      
    }else{
      this.checkbalance=false;
    }
  },err =>{
    console.log(err,"error in balance")
    // this.loader=false;
  })
}
openDialog(): void {
  const data = new MatDialogConfig();
  data.data = {
    data: this.e
  }
const dialogRef = this.dialog.open(InsuranceDetailsComponent, data);
  
  dialogRef.afterClosed().subscribe((result) => {
    
  });
  this.dialogRef.close()
}
}

