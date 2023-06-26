import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';

export interface PeriodicElement {
  claim_id: number;
  test_name: string;
  patient_name: string;
  insurance_company_name: string;
  status: number;
  claim_date: string;

}


@Component({
  selector: 'app-imagingreports',
  templateUrl: './imagingreports.component.html',
  styleUrls: ['./imagingreports.component.scss']
})
export class ImagingreportsComponent implements AfterViewInit {
  ELEMENT_DATA!: PeriodicElement[];
  displayedColumns: string[] = ['claim_id', 'test_name', 'patient_name', 'insurance_company_name', 'status', 'claim_date'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  stDate!: any;
  enDate!: any;
  insurance_values: any
  startDate1 = new FormControl();
  endDate1 = new FormControl();
  currPageIdx=0
  limitValue=2
  spinner=true
  respin=false
  searchFilter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10
  }
  minDate = new Date();
  maxDate = new Date();
  totalcount=0;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private labreport: ApiservicesService, private fb: FormBuilder,private route:Router) {
    
  }
  ngOnInit(): void {
    this.labreports();
    this.getinsurance();
    this.applyfilter();
  }


  getinsurance() {
    this.labreport.selectinsurance().subscribe(
      (res) => {
        this.insurance_values = res.list_of_countries[1].list_of_insurance_company;
        console.log(this.insurance_values, "matbag");

      },
      (err) => {
      }
    );
  }

  labreports() {
    this.spinner=true
    this.respin=false
    this.labreport.labrepoerts(this.queryObj).subscribe((res) => {
       // console.log(res, 'Lab Request Response');
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
        this.spinner=false
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

  insuranceFilter(event: any) {
    if (event) {
      this.queryObj['insurance_company_id'] = event;
    }
    else
      delete this.queryObj['insurance_company_id'];
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
      this.labreports();
    } else {
      this.spinner=false
      this.respin=true
    }
  }
  getNextData(currentSize: any, pageIdx: any,pageSize:any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.labreport.labrepoerts(this.queryObj).subscribe(
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


  navigate(data:any){
    localStorage.setItem("claim_id",data.claim_id)
    this.route.navigate(['/layout/reportdetail'])
  }






}
