import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { RecipesModule } from './recipes/recipes.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {AppRoutingModule} from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RecipesModule,
    AppRoutingModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
