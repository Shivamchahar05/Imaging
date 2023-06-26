import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { SendotpComponent } from '../sendotp/sendotp.component';

export interface RequestData {
  data:string
  
 }
@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss']
})
export class InsuranceDetailsComponent implements OnInit {
  imgUrl="https://staging.liviaapp.com"
  alldata: any;
  kra_pin_certificate: any;
  tax_compliance: any;
  cr_12: any;
  insurence: any;
  regulator_licenses_1: any;
  regulator_licenses_2: any;
  regulator_licenses_3: any;
  updateData =false;
  // claimId:any
  claim_id:any
  requestData:any[]=[];
  showData:any
  selection = new SelectionModel<any>(true, []);
  disabledBtn= true;
  constructor(private dialogRef: MatDialogRef<InsuranceDetailsComponent>,@Inject(MAT_DIALOG_DATA) data: any,private router:Router , private profileget :ApiservicesService,private dialog:MatDialog) {
    this.claim_id=data.data.data.claim_id
    console.log(this.claim_id,"httttttttt");
    
      this.requestData.push(data.data);
      console.log(data,"sajfnklasjfcl");
      this.showData = data.data;

   }

  ngOnInit(): void {
    this.getprofile();
    this.selection.changed.subscribe((item:any) => {
      this.disabledBtn = this.selection.selected.length == 0;
    })
  }

  close(){
    this.dialogRef.close()
  }
  sendOtp(){

  }
  getprofile(){
    this.profileget.profile().subscribe((res) => {
    console.log(res);
    this.alldata=res;
     this.kra_pin_certificate=res.kra_pin_certificate
     this.tax_compliance=res.tax_compliance
     this.cr_12=res.cr_12
     this.insurence=res.insurance_company
     this.regulator_licenses_1=res.regulator_licenses_1
     this.regulator_licenses_2=res.regulator_licenses_2
     this.regulator_licenses_3=res.regulator_licenses_3
    })
  }

  openDialog(): void { 
    const data = new MatDialogConfig();
    // this.verification();
    data.data = {
      data: this.showData,
      verification:this.verifyId
    }
  const dialogRef = this.dialog.open(SendotpComponent, data);
    
    dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.dialogRef.close()
  }
  // verification(){
  //   this.profileget.labrequestverification(this.claim_id).subscribe((res:any)=>{
  //     console.log(res);
      
  //   })
  //   } 

    verifyId:any;
  sendOTP(){
    // this.spinner=true
    this.updateData =true;
    // this.actionMethod()
    console.log(this.requestData[0].data.lab_requests,'ha6');
    let requestId:any=[]
    const value = {
      phone_id:localStorage.getItem('phone_id'),
      lab_request_ids: [],
      declined_lab_request_due_to_user_balance:[]
      
    }
    let data=this.requestData[0].data.lab_requests;
    data?.map((item:any)=>{
      requestId.push(item.lab_request_id)
      console.log(item,"jp");
      
    })
    value['lab_request_ids']=requestId
    JSON.stringify(value['lab_request_ids']);
    this.profileget.getOTP(value, this.claim_id).subscribe(res=>{
      if(res.code == 200){
        this.updateData =false;
        // this.snackService.openSnackBar(res.messages)
        this.verifyId=res.verification_id;
        this.openDialog()
        console.log(res,'harsh');
      }
    })

}
}
