import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'de', 'es', 'el']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();

    translate.use(
      browserLang && browserLang.match(/en|fr|de|es|el/) ? browserLang : 'en'
    );
  }

  ngOnInit(): void {}
}
