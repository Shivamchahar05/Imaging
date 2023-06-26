import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';

@Component({
  selector: 'app-createclaim',
  templateUrl: './createclaim.component.html',
  styleUrls: ['./createclaim.component.scss']
})
export class CreateclaimComponent implements OnInit {
  insuranceList: any;
  updateData = false;
  insuranceDetail = false;
  claimFrom!: FormGroup;
  isIllness = false;
  isAccident = false;
  constructor(private fb: FormBuilder,private layoutService: ApiservicesService, private route:Router) { }

  ngOnInit(): void {
    this.getInsuranceList()
    this.createForm()
  }

  getInsuranceList() {
    this.layoutService.selectinsurance().subscribe(res => {
      this.insuranceList = res.list_of_countries[1].list_of_insurance_company;
    }, err => {
      console.log(err,"Error in insurance list");
    })
  }
  createForm() {
    this.claimFrom = this.fb.group({
      claimDate: ['', [Validators.required]],
      insurance: ['', [Validators.required]],
      memberNum: ['', [Validators.required]],
      empName: ['', [Validators.required]],
      phoneNum: ['', [Validators.required]],
      memberPhoneNum: ['', [Validators.required]],
      patientName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      claimType: ['', [Validators.required]],
      consuitationType: ['', [Validators.required]],
      consultantFee: ['', [Validators.required]],
      clinic: ['', [Validators.required]],
      finalDiagnosis: ['', [Validators.required]],
      conditionDiagnosis: ['', [Validators.required]],
      detailPreviousTreatment: ['', [Validators.required]],
      sickness: ['', [Validators.required]],
      illness: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      natureTreatment: ['', [Validators.required]],
      term: [false, [Validators.required]],
    });
  }
  onSelect(event: any) {
    console.log(event, "mmmmmmmmmmm");
    if (event == "accident") {
      this.isIllness = false;
      this.isAccident = true;
    } else if (event == "sickness") {
      this.isIllness = true;
      this.isAccident = false;
    }
    if (event) {
      this.insuranceDetail = true;
    } else {
      this.insuranceDetail = false;
    }
  }

  navigateToHome(){
  this.route.navigate(["/layout/imagingrequest"])
  }
  navigateToclaim(){
    this.route.navigate(["/layout/eclaims"])
  }

}
