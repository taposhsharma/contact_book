import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/router/app.router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from '../store/app.reduers';
import { MyEffects } from '../store/app.effects';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModelContactComponent } from './model-contact/model-contact.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NewContactComponent,
    EditComponentComponent,
    NotFoundComponent,
    ModelContactComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ myFeature: reducer }),
    EffectsModule.forRoot([MyEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true, // Set to true to allow multiple interceptors
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
