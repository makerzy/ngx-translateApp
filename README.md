# ngx-translate-App

- create an empty project **ng new i18n-app**
- change directory to the new app folder: **cd i18n-app**

## How to add ngx-translate to your Angular applicatiion

- Enter the following command in the terminal:
  > > npm install @ngx-translate/core @ngx-translate/http-loader --save
  > > the @ngx-translate/core contains the core routines for translation, the TranslationService and some pipes.
  > > the @ngx-translate/http-loader loads the translation files from your webserver.

## Import and Initialize TranslationModule in your app.module.ts

```import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,

        // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

The HttpLoaderFactory is required for AOT (ahead of time) compilation

**Create a new component ng g c home --skipTests**

_import TranslateService in **home.component.ts**_

```
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public translate: TranslateService) {
	//for __i18n-iso-coutries__ code visit: https://www.npmjs.com/package/i18n-iso-countries
	// 'en', 'fr', 'de', 'es', 'el' are the languages in this example

    translate.addLangs(['en', 'fr', 'de', 'es', 'el']); //add languages
    translate.setDefaultLang('en'); // set default language as en- english

    const browserLang = translate.getBrowserLang();  // get browser language

    translate.use(
      browserLang && browserLang.match(/en|fr|de|es|el/) ? browserLang : 'en' 		//matching browser language to the array of languages and setting english as fallback language.
    );
  }

  ngOnInit(): void {}
}
```

**Display the language options in the home.component.ts like so**

````<div class="top">
    <label for="langs">{{ "HOME.Select" | translate }}</label>
    <select id="langs" #langselect (change)="translate.use(langselect.value)">
      <option *ngFor="let lang of translate.getLangs()" [value]="lang">
        {{ lang.toUpperCase() }} /* change lang to uppercase*/
        <span *ngIf="lang == 'en'">English</span> /*Appending English to the i18n code using angular *ngIf expression*/
        <span *ngIf="lang == 'de'">German</span>
        <span *ngIf="lang == 'fr'">french</span>
        <span *ngIf="lang == 'el'">Greek</span>
        <span *ngIf="lang == 'es'">Spanish</span>
      </option>
    </select>
  </div>
	```

	**In the assets folder create i18n folder, in the i18n folder create corresponding .json folder for this example en.json, de.json, es.json, el.json and fr.json**

	in en.json:

	```
	{
  "HOME": {
    "Header": "Translation Page",
    "Content": "This page was built to display 5 local languages using ngx-translate, select your preferred language from the above options",
    "Select": "Select Language"
  }
}
````

fr.json:

```
{
  "HOME": {
    "Header": "Page de traduction",
    "Content": "Cette page a été conçue pour afficher 5 langues locales en utilisant ngx-translate, sélectionnez votre langue préférée parmi les options ci-dessus",
    "Select": "Choisir la langue"
  }
}
```

_the translation used in this example were gotten from google translator._

return to home.component.html and use pipe translate to translate the page like so:

```
<main>
  <h2>i18n-App</h2>
  <div class="top">
    <label for="langs">{{ "HOME.Select" | translate }}</label>
    <select id="langs" #langselect (change)="translate.use(langselect.value)">
      <option *ngFor="let lang of translate.getLangs()" [value]="lang">
        {{ lang.toUpperCase() }}
        <span *ngIf="lang == 'en'">English</span>
        <span *ngIf="lang == 'de'">German</span>
        <span *ngIf="lang == 'fr'">french</span>
        <span *ngIf="lang == 'el'">Greek</span>
        <span *ngIf="lang == 'es'">Spanish</span>
      </option>
    </select>
  </div>
  <section>
    <mat-card>
      <h2>{{ "HOME.Header" | translate }}</h2>

      <p>
        {{ "HOME.Content" | translate }}
      </p>
    </mat-card>
  </section>
</main>

```

Now we have implemented internationalization in our app using ngx-translate and our app will load the page based on the user language selected.
in the terminal run the following command: `ng serve -o`
