import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { FormserviceService } from 'src/app/services/Formservice/formservice.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  
  constructor(public formservice:FormserviceService,
    private router:Router,
    private signup3rd:ApiservicesService,
    private bar:BarsnackService
  ) { }
     
  formControlName='';
  imageSrc='';
  imag:any

  ngOnInit(): void {
  }
  onChange(event: any, name: string) {
    this.formControlName = name;
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
       
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.signup3rd.uploadimage(payLoad).subscribe(
      (res) => {
        console.log(res.image, 'response from image service!');
        this.documentcontrols.get(this.formControlName)?.setValue(res.image);
      },
      (err) => {
        console.log(err, 'Error from image service!');
      }
    );
  }





  submit(){
  const formdocument=this.formservice.register.controls.document.value
   formdocument['steps']=3
   this.signup3rd.signup3rd(formdocument).subscribe((res)=>{
    console.log(res)
    if(res.code==200){
      this.bar.openSnackBarres(res.message,'close');
    }
  })
    if(this.formservice.register.controls.document.valid){
   
    }
    console.log(this.formservice.register),"hiiiii";
    if(this.formservice.register.controls.document.get('taxcompliance')?.value){
     
    }
    
  }

  get documentcontrols() {
    return this.formservice.register.controls.document;
  }

  removedoc(img:any){
    const form={
      image:[this.formservice.register.controls.document.get(img)?.value]
    }
    this.signup3rd.deleteImage(form).subscribe((res:any)=>{
         this.formservice.register.controls.document.get(img)?.reset();
    })
  }


}
