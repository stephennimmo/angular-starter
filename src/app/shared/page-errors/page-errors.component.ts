import { Component, Input } from '@angular/core';
import { PageError } from '../base-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-errors',
  templateUrl: './page-errors.component.html',
  styleUrls: ['./page-errors.component.scss']
})
export class PageErrorsComponent {

  @Input()
  pageErrors$?: Observable<PageError[]>;

}
