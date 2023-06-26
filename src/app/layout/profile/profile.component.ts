import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Email:any
  Name:any
  Phonenumber:any
  city_name:any
  country_name:any
  imageSrc:any=""
  preview="https://staging.liviaapp.com"
  and:any
  kra_pin_certificate:any
  tax_compliance:any
  alldata:any
  cr_12:any
  regulator_licenses_1:any
  regulator_licenses_2:any
  regulator_licenses_3:any
  bio: any;
  constructor(private router:Router , private profileget :ApiservicesService) { }

  ngOnInit(): void {
    this.getprofile();
  }

  slides :string[]=[];
  insurence:any;

  home(){
     this.router.navigate(["/layout/imagingrequest"])
  }
  getprofile(){
    this.profileget.profile().subscribe((res) => {
    console.log(res);
    this.alldata=res;
     this.Email=res.email
     this.Phonenumber=res.login_phone
     this.Name=res.first_name
     this.city_name=res.physical_address
     this.bio=res.lab_bio
     this.country_name=res.city_name
     for(let indix =0; indix < res.lab_images.length; indix++){
     this.slides.push(res.lab_images[indix])
     }
     this.imageSrc=res.avatar
     console.log(this.slides ,"notout");
     console.log(this.imageSrc,"ggggggggggggggg");
     this.kra_pin_certificate=res.kra_pin_certificate
     this.tax_compliance=res.tax_compliance
     this.cr_12=res.cr_12
     this.insurence=res.insurance_company
     this.regulator_licenses_1=res.regulator_licenses_1
     this.regulator_licenses_2=res.regulator_licenses_2
     this.regulator_licenses_3=res.regulator_licenses_3
    })
  }

  editprofile(){
    this.router.navigate(['/layout/editprofile']);
  }

}
