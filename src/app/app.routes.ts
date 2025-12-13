import {Routes} from '@angular/router';
import {Index} from './pages/index';
import {Login} from './pages/login/login';
import {Home} from './pages/home/home';
import {authGuard} from './services/guards/auth.guard';

export const routes: Routes = [
  {path: "", component: Index},
  {path: "login", component: Login},
  {path: "home", component: Home, canActivate: [authGuard]}
];
