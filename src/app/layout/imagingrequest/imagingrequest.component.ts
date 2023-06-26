import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import {debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
import { AcceptbalancenotComponent } from './accept/acceptbalancenot/acceptbalancenot.component';
export interface PeriodicElement {
  claim_id: number;
  doctor_name: string;
  beneficiary_name: string;
  insurance_company_name: string;
  total_lab_request:number;
  claim_date:string;

}


@Component({
  selector: 'app-imagingrequest',
  templateUrl: './imagingrequest.component.html',
  styleUrls: ['./imagingrequest.component.scss']
})
export class ImagingrequestComponent implements AfterViewInit {
  ELEMENT_DATA!:PeriodicElement[];
  displayedColumns: string[] = ['claim_id', 'doctor_name', 'beneficiary_name', 'insurance_company_name','total_lab_request','claim_date','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  stDate!: any;
  enDate!: any;
  insurance_values:any
  startDate1 = new FormControl();
  endDate1 = new FormControl();
  limitValue=2
  queryObj:any={
    offset:0,
    limit:10
  }
  spinner=true
  respin=false
  // totalcount=0;
  minDate = new Date();
  maxDate = new Date();
 
 
  searchForm!: FormGroup;
  constructor(private labreq:ApiservicesService ,private fb:FormBuilder,private route:Router,public dialog: MatDialog) {
    this.createForm();
   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.labrequest();
    this.getinsurance();
    this.applyfilter();
    
  }

  createForm() {
  this.searchForm=this.fb.group({
    searchFilter:new FormControl()
    });
  }
  data:any;
  getinsurance(){
    this.labreq.selectinsurance().subscribe(
      (res) => {
       this.insurance_values = res.list_of_countries[1].list_of_insurance_company;
       console.log(this.insurance_values );
       
      },
      (err) => {
      }
    );
  }

  labrequest(){
    this.spinner=true
    this.respin=false
    this.labreq.labrequest(this.queryObj).subscribe((res) => {
      console.log(res ,"bag")
       // console.log(res, 'Lab Request Response');
       this.ELEMENT_DATA = res.body;
       this.ELEMENT_DATA.length = res.count;
       this.dataSource =new MatTableDataSource<any>(this.ELEMENT_DATA) ;
       this.dataSource.paginator = this.paginator;
       this.spinner = false;
      // this.totalcount=res.count
      // this.spinner=false
      // this.respin=true
      // this.dataSource.data =res.body as PeriodicElement[];
     
    })
  }
  applyfilter() {
    console.log("mmmmmmmmattt");
    this.searchForm.controls.searchFilter?.valueChanges
      .pipe(debounceTime(3000), distinctUntilChanged())
      .subscribe((res: any) => {
        this.queryObj.offset = 0;
        this.queryObj.limit = 10;
        if (this.searchForm.controls.searchFilter.value) {
          
          if (isNaN(parseInt(this.searchForm.controls.searchFilter.value))) {
            console.log('String search');
            this.queryObj['search'] = res;
          } else {
            console.log('Number search', parseInt(res), typeof parseInt(res));
            this.queryObj['search'] = parseInt(res);
          }
        } else {
          delete this.queryObj['search'];
        }
        this.paginator.pageIndex = 0;
        this.getNextData(0,0,10)
      });
  }
  insuranceFilter(event: any) {


    if(event){
      this.queryObj['insurance_company_id']=event;
    }
    else{
    delete this.queryObj['insurance_company_id'];
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
      this.labrequest();
    } else {
      this.spinner=false
      this.respin=true
    }

  }
  clearDate(event: any,id:number) {
    console.log("hyyyyyy");
    
    event.stopPropagation();
    if (id == 1) {
      this.stDate = null;
      delete this.queryObj['claim_start_date'];
    } else {
      this.enDate = null;
      delete  this.queryObj['claim_end_date']
      this.getNextData(0,0,10)
    }
  }

  rejectRequest(claim_id: any) {
    console.log(claim_id,'idddddddddd');

    this.labreq.deleteImagingRequest(claim_id).subscribe(
      (res) => {
        console.log('delete API', res);
        this.getNextData(0,0,10)

      },
      (err) => {
        console.log('API DELETE', err);

      }
    );
  }
  getNextData(currentSize: any, pageIdx: any,pageSize:any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.labreq.labrequest(this.queryObj).subscribe(
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

  openDialog(e:any) {
    const data=new MatDialogConfig();
    data.data={
      data:e
    }
    const dialogRef = this.dialog.open(AcceptbalancenotComponent,data);
     console.log(e,"hethbdjskdddk");
     
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 

}
