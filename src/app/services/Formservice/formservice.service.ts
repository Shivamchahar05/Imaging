import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormserviceService {
  public register!:FormGroup
  constructor( private fb : FormBuilder) {  }



  createForm(){
    this.register=this.fb.group({
      profile:this.fb.group({
      avatar:['', [Validators.required]],
      lab_name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      physical_address: ['', [Validators.required]]
      }),
      document:this.fb.group({
      tax_compliance:['', [Validators.required]],
      cr_12:['', [Validators.required]],
      kra_pin_certificate:['', [Validators.required]],
      regulator_licenses_1:['', [Validators.required]],
      regulator_licenses_2:['', []],
      regulator_licenses_3:['', []]
      }),
      images: ['', [Validators.required]]
    })

  }


  
}


