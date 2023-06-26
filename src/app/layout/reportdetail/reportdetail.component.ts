import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';

@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.scss']
})
export class ReportdetailComponent implements OnInit {
  updateData = false;
  imageSrc = '';
  id:any
  img = "https://staging.liviaapp.com";
  payLoadData: string[] = [];
  claimData: any;
  emailData = false;
  reportData: any;
  spinner=false
  constructor(  private fb:FormBuilder, private reportDetail:ApiservicesService,private router:Router,private serviceSnack:BarsnackService) { }
  detailForm!: FormGroup;
  ngOnInit(): void {
    this.getClaimId();
    this.createForm();
    this.profile();
  }
  claim_id=localStorage.getItem('claim_id')
  createForm() {
    this.detailForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      notes: ['', [Validators.required]],
      lab_images: ['', [Validators.required]]
    });
  }

  getClaimId(){
    this.reportDetail.report_Detail(this.claim_id).subscribe(res => {
            this.reportData = res;
            console.log(this.reportData, 'gye2duv2rdf2');
          }, err => {
            this.router.navigate([])
          })
  }

  profile(){
    this.spinner=true;
    this.reportDetail.profile().subscribe(
      (res:any) => {
        this.id = res.id;
        this.spinner = false;
      },
      (err:any) => {
        this.spinner = false;
      }
    );
  }

  setEmail() {
    this.emailData = true;
  
    const formValue = {
      user_id:this.id, 
      email:this.detailForm.controls.email.value
    }
    console.log(formValue,'hufwiyfctrvew');
    
    this.reportDetail.setEmail(formValue).subscribe((res:any) => {
      console.log(res, "User email set!!");
      this.serviceSnack.openSnackBarres(res.messages[0],'close')
      this.emailData = false;
    }, err => {
      console.log(err,"error in user email");
    })
   }


   onFileChange(event: any, type: string) {
    this.spinner = true;
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    console.log(file, "imageeeeeee");
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        // this.serviceSnack.openSnackBarres('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e: any) {
    this.spinner=true
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.reportDetail.uploadimage(payLoad).subscribe(
      (res:any) => {
        this.payLoadData.push(res.image);
        this.detailForm.patchValue({
          lab_images: this.payLoadData,
        });
        this.spinner = false;
      },
      (err:any) => {
        console.log(err, 'Error from image service!');
        this.spinner = false;
      }
    );
  }

  deleteImg(idx: any) {
    this.reportDetail.deleteeditImage(this.payLoadData[idx]).subscribe(res => {
      console.log(res, "delete image");
      this.payLoadData.splice(idx, 1);
      this.detailForm.patchValue({
        lab_images: this.payLoadData,
      });
    }, err => {
      console.log(err, "err in delete img!");
    })
  }

  saveData(idx:any){
    let id: any;
    id=this.reportData.test_details[idx].lab_request_id;
    const formValue = {
      lab_notes: this.detailForm.controls.notes.value,
      send_to_doctor: 0,
      documents:[]
    }
    console.log(formValue,"hiiii");
    this.reportDetail.saveDetail(id,formValue).subscribe((res:any) => {
      console.log(res, "response from send report!!!");
      this.updateData = false;
      this.serviceSnack.openSnackBarres(res.messages[0],'close');
      this.router.navigate(['/layout/imagingreports'])
    }, err => {
      console.log(err, "error from send report!!!");
      this.updateData = false;
    })
  }

  sendReport() {
    this.updateData = true;
   
    const formValue = {
      lab_notes: this.detailForm.controls.notes.value,
      send_to_doctor: 1,
      documents:this.detailForm.controls.lab_images.value
    }
    console.log(formValue,"hiiii");
    this.reportDetail.send_lab_report(this.id,formValue).subscribe((res:any) => {
      console.log(res, "response from send report!!!");
      this.updateData = false;
      this.serviceSnack.openSnackBarres(res.messages[0],'close');
      this.router.navigate(["/layout/imagingreports"])
    }, err => {
      console.log(err, "error from send report!!!");
      this.updateData = false;
    })
  }

  navigateToLabReport(){
    this.router.navigate(["/layout/imagingreports"])
  }
  navigateToHome(){
    this.router.navigate(["/layout/imagingrequest"])
  }
  


}
