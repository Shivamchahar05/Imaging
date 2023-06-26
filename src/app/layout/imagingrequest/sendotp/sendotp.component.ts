import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';

@Component({
  selector: 'app-sendotp',
  templateUrl: './sendotp.component.html',
  styleUrls: ['./sendotp.component.scss']
})
export class SendotpComponent implements OnInit {
  otp: any;
  claim_id:any
  disabledBtn!: boolean ;
  disable_btn=true
  interval: any;
  resend = false;
  verificationCode:any
  claimId:any
  requestData:any[]=[];
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    inputStyles: {
      width: "80px",
      height: "65px",
      backgroundColor: "#f2f9fc",
      border: "none",
      margin: "0 8.4% 0 0",
    },
  };
  verifyId: any;
  // verificationCode=DataTransfer.dta

  constructor(private dialogRef: MatDialogRef<SendotpComponent>,@Inject(MAT_DIALOG_DATA) data: any ,private dialog:MatDialog,private apiservice :ApiservicesService,private route:Router,private snackService:BarsnackService) { 
    this.claim_id=data.data.data.claim_id
    console.log(this.claim_id,"httttttttt");
    console.log(data,"fd");
    
    
      this.requestData.push(data.data);
      // console.log(data,"sa");
      console.log(this.requestData,"kkkkkkk");
      
      // this.showData = data.data;
      this.verificationCode=data.verification;
      // console.log(this.verificationCode);
      console.log(this.requestData[0].data?.lab_requests,"jijijijj",this.requestData);

  }

  ngOnInit(): void {
  
  }

  openDialog(): void {
    const data = new MatDialogConfig();
    // data.data = {
    //   data: e
    // }
  const dialogRef = this.dialog.open(SendotpComponent, data);
    
    dialogRef.afterClosed().subscribe((result) => {
      
    });
    // this.dialogRef.close()
  }
  onOtpChange(otp: any) {
    this.otp = otp;
    // console.log(otp);
  }

  // verifyOtp() {
  //   if (this.otp.length == 4) {
  //     console.log("hiiiiiii");
  //     const formValue = {
  //       phone_id: localStorage.getItem('phone_id'),
  //       auth_code: this.otp,
  //       // verification_id:this.verificationCode
  //     }
      // this.apiservice.verifyOtp(formValue, this.claimId).subscribe(res => {
        // console.log(res, "Verify OTP!!!");
  //       if (res.code == 200) {
  //         // this.commonService.registerSnackBar(res.messages[0], "Close", "success-snackbar")
  //         // this.close();
  //       }
  //     }, err => {
  //       // this.commonService.registerSnackBar(err.error.messages[0], "Close", "red-snackbar")
  //       console.log(err,"Error in verify code!");
  //     })
  //   } else {
  //     this.disabledBtn = true;
    
  

  confirm(){
    console.log(this.verificationCode,'confom OTP');
    if(this.otp.length==4){
    const formValue = {
      phone_id:localStorage.getItem('phone_id'),
      auth_code:this.otp,
      verification_id:this.verificationCode
    }
    console.log(formValue,'success');
    this.apiservice.verifyOtp(formValue,this.claim_id).subscribe((res:any)=>{
      if(res.code==200){
        // this.disable_btn=false
        this.snackService.openSnackBarres(res.messages,'close')
        this.onNoClick()
        this.route.navigate(['layout/imagingreports'])

      }
      
    },err=>{
      // this.disable_btn=false
      this.snackService.openSnackBarres(err.error.messages,'close')
    })
  } else{
    // this.disable_btn=true
  }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
 
  resendOTP(){
    // this.spinner=true
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
    this.apiservice.getOTP(value, this.claim_id).subscribe(res=>{
      // if(res.code == 200){
      //   // this.spinner=false
      //   // this.snackService.openSnackBar(res.messages)
      //   this.verifyId=res.verification_id;
      //   this.openDialog()
      //   console.log(res,'harsh');
      // }
    })

}
 



}
