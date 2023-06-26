import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiservicesService } from 'src/app/services/Api/apiservices.service';
export interface PeriodicElement {
  name: string;
  test_fee: number;
  insurance_company_name: string;
 

}



@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements AfterViewInit {
  ELEMENT_DATA!:PeriodicElement[];
  displayedColumns: string[] = ['name', 'test_fee', 'insurance_company_name'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currPageIdx=0
  limitValue=2

  searchFilter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10
  }
  spinner=true
  respin=false
 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private labtests:ApiservicesService,private route:Router) { }
  ngOnInit(): void {
    this.labtest();
    this.applyfilter();
  }

  labtest(){
    this.spinner=true
    this.respin=false
    this.labtests.labTests(this.queryObj).subscribe((res) => {
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
      .pipe(debounceTime(2000), distinctUntilChanged())
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

  getNextData(currentSize: any, pageIdx: any,pageSize:any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.labtests.labTests(this.queryObj).subscribe(
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






  

}
