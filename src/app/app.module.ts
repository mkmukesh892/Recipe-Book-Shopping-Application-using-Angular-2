import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { RecipesModule } from './recipes/recipes.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {AppRoutingModule} from './app-routing.module';
import { SharedModule } from './shared/shared-module';
import { AuthModule } from './auth/auth-module';
import { ShoppingListModule } from './shopping-list/shopping-list-module';

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
    AppRoutingModule,
    SharedModule,
    AuthModule ,
    ShoppingListModule            
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
