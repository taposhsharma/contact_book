import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponentComponent } from 'src/app/edit-component/edit-component.component';
import { HomeComponent } from 'src/app/home/home.component';

import { LoginComponent } from 'src/app/login/login.component';
import { NewContactComponent } from 'src/app/new-contact/new-contact.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { SignupComponent } from 'src/app/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'newcontact', component: NewContactComponent},
  {path:'contact/:id', component:EditComponentComponent},
  {path:'**', component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}