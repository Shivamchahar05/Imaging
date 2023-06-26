import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { BarsnackService } from 'src/app/services/snackbar/barsnack.service';
import { AddresspopComponent } from './addresspop.component';
// import { FormserviceService } from 'src/app/services/Formservice/formservice.service';
// import { FormserviceService } from 'src/app/services/Formservice/formservice.service';
export interface DialogData {
  address:any;
}
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  deleteprofilpic=false
  preview="https://staging.liviaapp.com"
  imgpic="";
  editprofileForm!: FormGroup;
  img: string[] = [];
  sendimage: string[] = [];
  imageSrc = "";
  deleteimage: string[] = []
  name:any
  number:any
  addres:any
  country:any
  country_data:any
  bio:any
  imageSrc123: any;
  address: any;
  messages="successfull updated"
  constructor(private router:Router,private fb:FormBuilder, private profile: ApiservicesService, public dialog: MatDialog , private snack:BarsnackService ) { }

  ngOnInit(): void {
    this.createForm()
    this.user();
    this.getCountryData();
  }
  createForm() {
    this.editprofileForm = this.fb.group({
      avatar:['', [Validators.required]],
      lab_name: [null, [Validators.required]],
      contactnumber: [null, [Validators.required]],
      physical_address:["",[Validators.required]],
      countery:["" , [Validators.required]],
      lab_image:["" , [Validators.required]],
      lab_bio:["" , [Validators.required]],
    });
  }
  home(){
    this.router.navigate(["/layout/imagingrequest"])
  }
  myprofile(){
    this.router.navigate(["/layout/profile"])
  }
  submit(){

  }
  get formControls() {
    return this.editprofileForm.controls;
  }
  onlogo(event: any) {
    this.deleteprofilpic=false
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];

    var reader = new FileReader();

    reader.onload = this._handleReaderLoaded123.bind(this);
    reader.readAsDataURL(file);

  }
  _handleReaderLoaded123(e: any) {
    let reader = e.target;
    this.imageSrc123 = reader.result.substr(reader.result.indexOf(',') + 1);
    // this.editprofileForm.get("avatar")?.patchValue(this.imageSrc123);
    let payLoad = {
      image:this.imageSrc123,
      type:"labs  "
    };
    this.profile.uploadimage(payLoad).subscribe(
      (res: any) => {
        // this.img.push(res.image);

        // this.sendimage.push(res.image);
        this.editprofileForm.get("avatar")?.patchValue(res.image);
        this.imgpic=res.image;
        // this.editprofileForm.patchValue({lab_image:this.img});
        console.log(res, 'mmmmmmm');

      },
      (err) => {
        console.log(err, 'Error from image service!');
      }
    );

  }

  onFileChange(event: any) {
    this.deleteprofilpic=false
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
    this.profile.uploadimage(payLoad).subscribe(
      (res: any) => {
        this.img.push(res.image);

        // this.sendimage.push(res.image);

        // this.editprofileForm.patchValue({lab_image:this.img});
        // console.log(res, 'mmmmmmm');

      },
      (err) => {
        console.log(err, 'Error from image service!');
      }
    );

  }

  removephoto(index: any) {
    console.log(this.img[index], "llllllllllllllll");
    this.profile.deleteeditImage(this.img[index]).subscribe(res => {
      console.log(this.img[index]);
      console.log(res, "delete image");
    }, err => {
      console.log(err, "err in delete img!");
    })

    this.img.splice(index, 1);
    this.sendimage.splice(index, 1);
    this.editprofileForm.patchValue({
      images: this.img,
    });

  }


  user(){
    this.profile.profile().subscribe((res:any)=>{
      this.profile.setuserData(res);
      console.log(res);
      this.imgpic=res.avatar
      this.name=res.lab_name
      this.number=res.phone_number
      this.addres=res.physical_address
      this.country=res.city_name
      console.log(this.country);
      this.img=res.lab_images;
      this.bio=res.lab_bio
      this.editprofileForm.get("lab_name")?.patchValue(this.name)
      this.editprofileForm.get("contactnumber")?.patchValue(this.number)
      this.editprofileForm.get("physical_address")?.patchValue(this.addres)
      this.editprofileForm.get("countery")?.patchValue(this.country)
      this.editprofileForm.get("lab_bio")?.patchValue(this.bio)
      // for(let ind=0;ind<this.sendimage.length;ind++){
      // this.editprofileForm.get("labphotos")?.patchValue(this.sendimage[ind])
      
      // }
      console.log(this.editprofileForm.value);
      
      
    })
  }

  update(){
    const paylod2nd={
      steps:'2',
      avatar:this.editprofileForm.get("avatar")?.value,
      lab_name:this.editprofileForm.get("lab_name")?.value,
      physical_address:this.editprofileForm.get("physical_address")?.value,
      lab_bio:this.editprofileForm.get("lab_bio")?.value,
      
      latitude:"11.11",
      Longitude:"33.33",
      city_id:"200787"
    }

    this. upload();
   this.profile.signup2nd(paylod2nd).subscribe((res:any)=>{
     console.log(res);
     
   })
  }
  upload(){
    const payLoad3rd={
      steps:"4",
      images:this.img
    }
    this.profile.signup4th(payLoad3rd).subscribe((res:any)=>{
      this.snack.openSnackBar(this.messages,'close ','red-snackbar');
      console.log(res);

      
    })
  }
  remove(){
    this.deleteprofilpic=true;
  }

  addressDialog(): void {
    const dialogRef = this.dialog.open(AddresspopComponent, {
      data: this.address,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
      this.address = result;
      this.editprofileForm.get('physical_address')?.setValue(this.address);
      }
    });
  }

  getCountryData(){
    this.profile.getCountry().subscribe(res=>{
      this.country_data=res.body      
    })
  }

}
