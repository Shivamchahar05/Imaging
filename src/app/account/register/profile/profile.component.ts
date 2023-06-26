import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { FormserviceService } from 'src/app/services/Formservice/formservice.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';

import { MappopupComponent } from '../mappopup/mappopup.component';
export interface DialogData {
  address:any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  spinner=false;
  address=""
  imageSrc:any=""
  previewImg=""

  constructor(
    public dialog: MatDialog ,
    public formservice:FormserviceService,
    private signup1:ApiservicesService, 
    private bar:BarsnackService) { }

  ngOnInit(): void {
    this.formservice.createForm();
  }
  addressDialog(): void {
    const dialogRef = this.dialog.open(MappopupComponent, {
      data: this.address,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.address = result;
      this.formservice.register.controls.profile.get('address')?.setValue(this.address);
      }
    });
  }
  get profileControls() {
    return this.formservice.register.controls.profile;
  }
  onsubmit(){
    this.spinner=true;
    const formprofile=this.formservice.register.controls.profile.value;
    formprofile['steps']=2.,
    formprofile['lab_bio']="",
    formprofile['latitude']=11.11,
    formprofile['longitude']=33.33,
    formprofile['city_id']=200787,
  
    
    this.signup1.signup2nd(formprofile).subscribe((res)=>{
      this.spinner=false
      console.log(res)
      if(res.code==200){
        this.bar.openSnackBarres(res.message,'close');
      }
    })
    console.log(this.formservice.register);
  }


  readURL(event: any) {
    var file = event.dataTransfer
    ? event.dataTransfer.files[0]
    : event.target.files[0];
  var reader = new FileReader();
  reader.onload = this._handleReaderLoaded.bind(this); 
  reader.readAsDataURL(file);
}
_handleReaderLoaded(e: any) {
  let reader = e.target;
  this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
  let payLoad = {
    image: this.imageSrc,
    type: 'labs',
  }
  this.signup1.uploadimage(payLoad).subscribe(
    (res) => {
      this.previewImg = e.target.result;
      console.log(res.image, 'response from image service!');
      this.profileControls.get('avatar')?.setValue(res.image);
    },
    (err) => {
      console.log(err, 'Error from image service!');
    }
  );
  }
  removedoc(img:any){
    const form={
      image:[this.formservice.register.controls.profile.get(img)?.value]
    }
    this.signup1.deleteImage(form).subscribe((res:any)=>{
         this.formservice.register.controls.profile.get(img)?.reset();
         this.previewImg=''
         this.imageSrc=''
    })
  }
}
