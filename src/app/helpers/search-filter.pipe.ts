import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/User';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: User[], args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(function(val) {
      let rVal = (val.fullName?.toLocaleLowerCase().includes(args)) ||
      (val.email?.toLocaleLowerCase().includes(args));
      return rVal
    });
  }
  

}