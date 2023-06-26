import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  user_id:any;
  baseurl = "https://staging.liviaapp.com/api"
  paymentIds: any;
  constructor(private http:HttpClient) { }

  signup1st(data: any): Observable <any>{
    return this.http.post(this.baseurl + "/lab-signup" , data);
  }

  signup2nd(data: any): Observable <any>{
    return this.http.put(this.baseurl + `/lab-signup?id=${this.user_id}` , data);
  }

  signup3rd(data: any): Observable <any>{
    return this.http.put(this.baseurl + `/lab-signup?id=${this.user_id}`, data);
  }
  
  signup4th(data: any): Observable <any>{
    
    return this.http.put(this.baseurl + `/lab-signup?id=${this.user_id}` , data);
    console.log(data,"hmmmmm");
    
  }
  login(data: any): Observable <any>{
    let head = new HttpHeaders(
      {
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke"
    })
    return this.http.put(this.baseurl + "/lab-auth" , data , {headers:head});

  }
  getuserdetails(data:any): Observable <any>{
    let head = new HttpHeaders(
      {
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke"
    })
    return this.http.patch(this.baseurl + "/lab-signup" , data, {headers:head});
  }

  setuserData(userData:any){
    this.user_id=userData.id;
  }

  forgetpassword(data:any): Observable <any>{
    return this.http.post(this.baseurl + "/lab-auth" , data);
  }

  forgettocken(data:any): Observable <any>{
    return this.http.patch(this.baseurl + "/lab-auth?verify_token=1" , data);
  }

  reset(data:any): Observable <any>{
    return this.http.patch(this.baseurl + "/lab-auth" , data);
  }

  city(): Observable <any>{
    return this.http.get(this.baseurl + "/city?limit=10&offset=0&search=&country_code=ke" );
  }

  uploadimage(data:any): Observable <any>{
    return this.http.patch(this.baseurl + "/image" , data);
  }

  deleteImage(data:any): Observable <any>{
    console.log(data,'Delete in service');
    const opt ={
       headers : new HttpHeaders({
      'liviaapp-token': `${localStorage.getItem('access_token')}`
    }),
    body:{
      'image':[data]
    }
  };
  
    
    return this.http.delete(this.baseurl + "/image" , opt);
  }
  deleteeditImage(data:any): Observable <any>{
    console.log(data,'Delete in service');
    const opt ={
       headers : new HttpHeaders({
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    }),
    body:{
      'image':[data]
    }
  };
  
    
    return this.http.delete(this.baseurl + "/image" , opt);
  }


  labrequest(queryObj:any): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.get(this.baseurl + "/lab-request",
      { headers: header,params:queryObj });
  }
  selectinsurance(): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.get(this.baseurl + "/lab-settings",
      { headers: header });
  }

 
  deleteImagingRequest(calim_id:any): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.delete(this.baseurl + `/lab-request/${calim_id}` , { headers: header });
  }

  labrepoerts(queryObj:any): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.get(this.baseurl + "/lab-report",
      { headers: header ,params:queryObj});
  }


  labclaims(queryObj:any): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.get(this.baseurl + "/lab-claim",
      { headers: header ,params:queryObj});
  }

  labTests(queryObj:any): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.get(this.baseurl + "/lab-test",
      { headers: header,params:queryObj });
  }
  
  labPayment(queryObj:any): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
    return this.http.get(this.baseurl + "/lab-payment",
      { headers: header,params:queryObj });
  }
  profile(): Observable <any>{
    let header = new HttpHeaders({
      'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token': `${localStorage.getItem('login_token')}`
    });
     return this.http.get(this.baseurl + "/lab-profile",{ headers: header})
  }
  
  getCountry():Observable<any> {
    let head = new HttpHeaders(
      {
        'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token':`${localStorage.getItem('access_token')}`
    }
    )
    return this.http.get(this.baseurl + "/city?limit=10&offset=0&search=&country_code=ke",{headers:head})

  }
  getuserbalance(claim_id:any){
    let head = new HttpHeaders(
      {
        'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token':`${localStorage.getItem('login_token')}`
    }
    )
    console.log(claim_id,"jsdhsddij");
    
    return this.http.get(this.baseurl + `/user-lab-test/${claim_id}`,{headers:head})
   
    
  }

  labrequestverification(claim_id:any){
    let head = new HttpHeaders(
      {
        'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
      'liviaapp-token':`${localStorage.getItem('login_token')}`
    }
    )
    console.log(claim_id,"jsdhsddij");
    
    return this.http.put(this.baseurl + `/lab-request/${claim_id}`,{headers:head})
   
    
  }

  // verifyOtp(queryObj: any, claimId: any): Observable<any> {
    // let head = new HttpHeaders(
    //   {
    //   'liviaapp-token':`${localStorage.getItem('login_token')}`
    // }
    // )
    // console.log(queryObj,(claimId),"serviceeeee! verifyyyyyyyyyyyyyyyy",localStorage.getItem('access_token'));
    // return this.http.patch(`${Constant.labRequestUrl}/${claimId}`,queryObj,{headers:this.head});
    
    getOTP(queryObj:any, claimId:any): Observable<any>{
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.put(this.baseurl+`/lab-request/${claimId}`,queryObj,{headers:head});
      
     }

     verifyOtp(queryObj:any,claimId:any){
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.patch(this.baseurl+`/lab-request/${claimId}`,queryObj,{headers:head})
 
    }

    send_lab_report(claim_id:any,data:any){
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.put(this.baseurl + `/lab-report/${claim_id}`,data ,{headers:head});   
  
    }
    setEmail(data:any){
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.post(this.baseurl + "/lab-report" ,data ,{headers:head});
  
    }
    report_Detail(claim_id:any){
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.get(this.baseurl + `/lab-report/${claim_id}`,{headers:head});   
  
    }
    saveDetail(requestId:any,data:any){
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.put(this.baseurl + `/lab-report/${requestId}`,data ,{headers:head})
   
     }
     setPaymentId(data:any){
       this.paymentIds =data
     }
     getpaymaentId(){
       return this.paymentIds
     }


     initiatePayment(claimId: any): Observable<any> {
      let head = new HttpHeaders(
        {
          'liviaapp-apiversion':"2.0",
      'liviaapp-country':"ke",
        'liviaapp-token':`${localStorage.getItem('login_token')}`
      }
      )
      return this.http.patch(this.baseurl+`/lab-payment`,claimId,{ headers:head });
    }

    
  
  

  }





