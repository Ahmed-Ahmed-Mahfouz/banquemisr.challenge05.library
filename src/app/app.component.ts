import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'banquemisr.challenge05.library';
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.isLoading = false;
      } else if (event instanceof NavigationError) {
        this.isLoading = false;
        console.error('Navigation Error:', event.error);
      }
    });

    if (
      typeof window !== 'undefined' &&
      !(window as any)['flowbiteInitialized']
    ) {
      initFlowbite();
      (window as any)['flowbiteInitialized'] = true;
    }
  }
}
