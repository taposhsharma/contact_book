import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogin } from '../../store/app.selector';
import { take } from 'rxjs/operators';
import * as MyActions from '../../store/app.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean ;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private contactService : ContactService
  ) {}
  ngOnInit() {
    const token = this.authService.getAuthToken();
    console.log(token);
    if (token) {
      this.store.dispatch(MyActions.login());
    }
    this.store.select(selectIsLogin).subscribe((isLogin) => {
      console.log('store' , isLogin)
      this.isLogin = isLogin;
    });
    console.log(this.isLogin)
  }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout();
    this.store.dispatch(MyActions.logout());
    this.router.navigate(['/login']);
    this.contactService.clear()
  }
}