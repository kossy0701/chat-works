import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  transform(date: Date): any {
    return format(date, 'yyyy年MM月dd日 HH:mm:ss', { locale: ja });
  }

}
