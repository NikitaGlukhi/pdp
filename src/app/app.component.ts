import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-root 8';

  constructor(private readonly meta: Meta) {
    let i  = 0;
    let tim = setInterval(() => {

      let tag = this.meta.getTag('http-equiv=Content-Security-Policy');

      if (tag) {

        this.meta.removeTag('http-equiv=Content-Security-Policy');
        let content = tag.getAttribute('content') as string;
        let str = 'connect-src ';debugger;
        let index = content.indexOf(str);
        content = content.slice(0, index + str.length) + "http://localhost:3000/ " + content.slice(index + str.length);
        this.meta.updateTag({ 'http-equiv': 'Content-Security-Policy', content: content });
      } else {

        this.meta.addTag({ 'http-equiv': 'Content-Security-Policy', content: 'connect-src \'self\' http://localhost:3000/;' });
      }

      if (i == 1) clearInterval(tim);
      i++;
    }, 1000);
  }
}
