import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentstatus'
})
export class PaymentstatusPipe implements PipeTransform {

  transform(value:string): any {
    switch (value) {
      case '7':
        return 'Ready for payment';
      case '9':
      return 'Fund in withdrawal process';
      case '10':
        return "Disbusered";
      default:
        break;
    }
  
  }

}
