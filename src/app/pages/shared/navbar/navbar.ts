import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [ NgbCollapse, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  appTitle = environment.app.title;
  isCollapsed: boolean = true;
}
