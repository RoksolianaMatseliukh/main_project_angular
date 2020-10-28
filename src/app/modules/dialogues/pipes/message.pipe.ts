import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messagePipe'
})
export class MessagePipe implements PipeTransform {

  transform(body: string): string {
    if (!body) {
      return;
    }

    if (body.length < 5) {
      return body;
    }

    let newBody = '';

    for (let i = 0; i < 4; i++) {
      newBody += body[i];
    }

    return `${newBody}...`;
  }

}
