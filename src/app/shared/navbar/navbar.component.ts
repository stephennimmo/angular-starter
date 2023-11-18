import { Component } from '@angular/core';
import { BaseComponent } from '../base-component';
import { AuthService, UserProfile } from '../../core/service/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {

  isCollapsed: boolean = false;

  isAuthenticated?: Observable<boolean>;
  currentUser?: Observable<UserProfile | null>;

  constructor(private router: Router, private authService: AuthService) {
    super();
  }

  init(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.currentUser();
  }

  public logout(): void {
    this.addSubscription(this.authService.logout().subscribe(value => {
      this.router.navigate(['/']);
    }));
  }

  destroy(): void {
  }

}
