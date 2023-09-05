import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(dateStr: string | Date) {
        const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
        return `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}`;
;    }
}
