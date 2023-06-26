import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';

export interface PeriodicElement {
  claim_id: number;
  test_name: string;
  claim_amount: number;
  default_full_amount:number;
  transaction_status:number;
  claim_date:string;
  checkemat:false

}


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements AfterViewInit {
  ELEMENT_DATA!:PeriodicElement[];
  displayedColumns: string[] = ['checkemat', 'claim_id', 'test_name', 'claim_amount','default_full_amount','transaction_status','claim_date'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  initiatePaymentData: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  stDate!: any;
  enDate!: any;
  startDate1 = new FormControl();
  endDate1 = new FormControl();
  searchFilter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10
  }
  spinner=true
  respin=false
  minDate = new Date();
  maxDate = new Date();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private labpayment:ApiservicesService , private route:Router) { }

  ngOnInit(): void {
    this.payment();
    this.applyfilter();
    this.checkboxChanged()
  }
  checkboxChanged() {
    this.selection.changed.subscribe(item => {
      if (item.added.length) {
        this.initiatePaymentData.push(item.added[0]);
      } else if (item.removed.length) {
        this.initiatePaymentData.map((payData: any, index: number) => {
          if (payData.claim_id == item.removed[0].claim_id) {
            this.initiatePaymentData.splice(index, 1);
          }
        })
      }
    })
  }

  payment(){
    this.spinner=true
    this.respin=false
    this.labpayment.labPayment(this.queryObj).subscribe((res) => {
      this.ELEMENT_DATA = res.body;
      this.ELEMENT_DATA.length = res.count;
      this.dataSource =new MatTableDataSource<any>(this.ELEMENT_DATA) ;
      this.dataSource.paginator = this.paginator;
      this.spinner = false;

    })
  }

  applyfilter() {
    console.log("mmmmmmmmattt");

    this.searchFilter?.valueChanges
      .pipe(debounceTime(3000), distinctUntilChanged())
      .subscribe((res: any) => {
        this.queryObj.offset = 0;
        this.queryObj.limit = 10;
        if (this.searchFilter.value) {
          if (isNaN(parseInt(this.searchFilter.value))) {
            console.log('String search');
            this.queryObj['search'] = res;
          } else {
            console.log('Number search', parseInt(res), typeof parseInt(res));
            this.queryObj['search'] = parseInt(res);
          }
        } else {
          console.log("bffffffffffffffffffffff");

          delete this.queryObj['search'];
        }
        this.paginator.pageIndex = 0;
        this.getNextData(0,0,10)
      });
  }

  statusfilter(event:any)
  {
  if(event){
    this.queryObj['status']=event
  }else{
    delete this.queryObj['status']
  }
  this.paginator.pageIndex = 0;
  this.getNextData(0,0,10)
  }

  startDate(e: any) {
    this.minDate = new Date(this.stDate);
    const stringified = JSON.stringify(e.value);
    this.stDate = stringified.substring(1, 11);
    if (this.enDate != undefined) {
     
      this.dateFilter();
    }
  }

  endDate(e: any) {
    this.maxDate=new Date(this.enDate)
    let stringified = JSON.stringify(e.value);
    this.enDate = stringified.substring(1, 11);
    
    console.log(this.stDate, "date", this.enDate > this.stDate);
    this.dateFilter();
  }
  clearDate(event: any,id:number) {
    console.log("hyyyyyy");
    
    event.stopPropagation();
    if (id == 1) {
      this.stDate = null;
      this.stDate = undefined;
      delete this.queryObj['claim_start_date'];
    } else {
      this.enDate = null;
      this.enDate = undefined;
      delete  this.queryObj['claim_end_date']
      this.getNextData(0,0,10)
    }
  }


  dateFilter() {
    this.spinner=true
    this.respin=false
    if (this.stDate) {
      this.queryObj['claim_start_date']=this.stDate
    } else {
      delete  this.queryObj['claim_start_date']
    }
    if (this.enDate) {
      this.queryObj['claim_end_date']=this.enDate
    } else {
      delete  this.queryObj['claim_end_date']
    }
    if (this.stDate != undefined && this.enDate >= this.stDate) {
      this.payment();
    } else {
      this.spinner=false
      this.respin=true
      
    }
  }

  getNextData(currentSize: any, pageIdx: any,pageSize:any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.labpayment.labPayment(this.queryObj).subscribe(
      (res:any) => {
        this.ELEMENT_DATA.length = currentSize;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource =new MatTableDataSource<any>(this.ELEMENT_DATA) ;
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        this.route.navigate(['/login'])
        this.spinner = false;
        console.log(err, 'err from Lab Request');
      }
    );
  }


  getPageDetails(event: any) {
    this.spinner = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize,((pageIndex)*10).toString(),pageSize.toString());
  }
  makePayment() {
    console.log(this.initiatePaymentData, "Payment Data");
    this.labpayment.setPaymentId(this.initiatePaymentData);
    this.route.navigate(['/layout/initiatepayment']);
  }

  


  

}
