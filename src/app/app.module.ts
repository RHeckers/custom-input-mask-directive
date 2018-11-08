import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputMaskDirective } from './input-mask/input-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputMaskDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
