import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({ template: '' })
export abstract class BaseComponent implements OnInit, OnDestroy {

  private pageErrors$ = new BehaviorSubject<PageError[]>([]);
  private subscriptions: Subscription = new Subscription();

  abstract init(): void;
  abstract destroy(): void;

  protected addSubscription(s: Subscription): void {
    this.subscriptions.add(s);
  }

  protected getPageErrors(): Observable<PageError[]> {
    return this.pageErrors$.asObservable();
  }

  protected addPageErrors(pageErrors: PageError[]): void {
    this.pageErrors$.next(pageErrors);
  }

  protected clearPageErrors(): void {
    this.pageErrors$.next([]);
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destroy();
  }

}

export interface PageError {
  message: string;
}
