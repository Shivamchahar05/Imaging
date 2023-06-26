import { Component, OnInit } from '@angular/core';
import {  FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { FormserviceService } from 'src/app/services/Formservice/formservice.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  img: string[] = [];
  sendimage: string[] = [];
  imageSrc = "";
  deleteimage: string[] = []

  constructor(private _fb: FormBuilder, 
    private router: Router,
     public formservice: FormserviceService, 
     private signup4th: ApiservicesService,
      private bar:BarsnackService) { }

  ngOnInit(): void {

  }


  onFileChange(event: any) {
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
    };
    this.signup4th.uploadimage(payLoad).subscribe(
      (res: any) => {
        this.img.push(e.target.result);

        this.sendimage.push(res.image);

        this.formservice.register?.get('images')?.patchValue({
          images: this.sendimage,

        });
        console.log(res, 'mmmmmmm');

      },
      (err) => {
        console.log(err, 'Error from image service!');
      }
    );

  }
  removephoto(index: any) {

    console.log(this.sendimage[index], "llllllllllllllll");
    this.signup4th.deleteImage(this.sendimage[index]).subscribe(res => {
      console.log(res, "delete image");
    }, err => {
      console.log(err, "err in delete img!");
    })
    this.img.splice(index, 1);
    this.sendimage.splice(index, 1);
    this.formservice.register.patchValue({
      images: this.sendimage,
    });

  }
  submit() {
    console.log(this.formservice.register);
  }
  registervalidation() {
    const formimages = this.formservice.register.controls.images.value;
    formimages['steps'] = 4,
      this.signup4th.signup4th(formimages).subscribe((res) => {
        console.log(res)
        if (res.code == 200) {
          this.bar.openSnackBarres(res.message, 'close');
        }
      })
    this.router.navigate(["/registervalidate"])
  }

}
