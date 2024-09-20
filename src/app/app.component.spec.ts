import { TestBed } from '@angular/core/testing';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { AppComponent } from './app.component';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'banquemisr.challenge05.library' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('banquemisr.challenge05.library');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, banquemisr.challenge05.library'
    );
  });

  describe('AppComponent', () => {
    let routerMock: any;

    beforeEach(async () => {
      routerMock = {
        events: of(),
      };

      await TestBed.configureTestingModule({
        imports: [AppComponent],
        providers: [{ provide: Router, useValue: routerMock }],
      }).compileComponents();
    });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have the 'banquemisr.challenge05.library' title`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('banquemisr.challenge05.library');
    });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain(
        'Hello, banquemisr.challenge05.library'
      );
    });

    it('should set isLoading to true on NavigationStart', () => {
      routerMock.events = of(new NavigationStart(0, ''));
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      expect(app.isLoading).toBeTrue();
    });

    it('should set isLoading to false on NavigationEnd', () => {
      routerMock.events = of(new NavigationEnd(0, '', ''));
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      expect(app.isLoading).toBeFalse();
    });

    it('should set isLoading to false on NavigationCancel', () => {
      routerMock.events = of(new NavigationCancel(0, '', ''));
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      expect(app.isLoading).toBeFalse();
    });

    it('should set isLoading to false on NavigationError', () => {
      routerMock.events = of(
        new NavigationError(0, '', new Error('Test Error'))
      );
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(console, 'error');
      app.ngOnInit();
      expect(app.isLoading).toBeFalse();
      expect(console.error).toHaveBeenCalledWith(
        'Navigation Error:',
        jasmine.any(Error)
      );
    });

    it('should initialize Flowbite if not already initialized', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      (window as any)['flowbiteInitialized'] = false;
      spyOn(window as any, 'initFlowbite');
      app.ngOnInit();
      expect((window as any)['initFlowbite']).toHaveBeenCalled();
      expect((window as any)['flowbiteInitialized']).toBeTrue();
    });

    it('should not initialize Flowbite if already initialized', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      (window as any)['flowbiteInitialized'] = true;
      spyOn(window as any, 'initFlowbite');
      app.ngOnInit();
      expect((window as any)['initFlowbite']).not.toHaveBeenCalled();
    });
  });
});
