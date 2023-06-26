import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accepttestStatus',
  pure:true
})
export class AccepttestStatusPipe implements PipeTransform {

  transform(value:string): any {
    switch (value) {
      case '1':
        return 'Pending';
      case '2':
        return 'Pending';
      default:
        break;
    }
  
  }

}
