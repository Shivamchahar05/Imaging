import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eclaim'
})
export class EclaimPipe implements PipeTransform {

  transform(value:string): any {
    switch (value) {
      case '6':
        return 'Sent to a docter';
      case '2':
        return 'In a process';
      case '3':
        return "Accepted";
      default:
        break;
    }
  
  }

}
