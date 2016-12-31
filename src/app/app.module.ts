import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ErService } from './er.service';
import { EmotionToColorPipe } from './emotion-to-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmotionToColorPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ErService],
  bootstrap: [AppComponent]
})
export class AppModule { }
