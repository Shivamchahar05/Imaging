import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';

@Component({
  selector: 'app-initiatepayment',
  templateUrl: './initiatepayment.component.html',
  styleUrls: ['./initiatepayment.component.scss']
})
export class InitiatepaymentComponent implements OnInit {
  claimIds: any;
  paymentData: any;
  spinner = true;
  constructor(private initpay:ApiservicesService , private route: Router) { }

  ngOnInit(): void {
    this.getPaymentData();
  }

  getPaymentData() {
    if (this.initpay.getpaymaentId()) {
      this.claimIds = this.initpay.getpaymaentId();
      console.log(this.claimIds, "paymenttttt");
      const payLoad: any = {
        claim_ids: []
      };
      this.claimIds?.map((item: any) => {
        payLoad.claim_ids.push(item.claim_id);
      })
      console.log(payLoad, "jiiiiiiiiiiii");

      this.initpay.initiatePayment(payLoad).subscribe(res => {
        console.log(res, "Payment API");
        this.paymentData = res;
        this.spinner = false;
      }, err => {
        console.log(err, "Error in Payment API");
        this.spinner = false;
      })
    } else {
      this.route.navigate(['/layout/payments'])
    }
  }
  makePayment() { }

  navigateToHome(){
   this.route.navigate(["/layout/imagingrequest"])
  }
  navigateToLabReport(){
   this.route.navigate(["/layout/payments"])
  }

}
