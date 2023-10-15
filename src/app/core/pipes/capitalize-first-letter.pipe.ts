import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalizeFirstLetter'})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    const sentences = value.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split('|')
      .map(item => item.trim())
      .filter(item => item !== '');

    return sentences.map(sentence => {
      const firstLetter = sentence[0];

      return firstLetter.toUpperCase() + sentence.slice(1);
    }).join(' ');
  }
}
