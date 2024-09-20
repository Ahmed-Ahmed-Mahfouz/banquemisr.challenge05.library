import { WishlistService } from './../../../core/services/wishlist.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  template: `
    <div
      *ngIf="visible"
      class=" flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        *ngIf="icon === 'success'"
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <!-- Success icon -->
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
      </div>
      <div
        *ngIf="icon === 'warning'"
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
      >
        <!-- Warning icon -->
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
          />
        </svg>
      </div>
      <div class="ms-3 text-sm font-normal">{{ message }}</div>
    </div>
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() icon: 'success' | 'warning' = 'success';
  visible = false;
  toastSub!: Subscription;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.toastSub = this.wishlistService.toastMessage$.subscribe((toast) => {
      if (toast && toast.message) {
        this.message = toast.message;
        this.icon = toast.icon;
        this.visible = true;

        // Set a timeout to hide the toast after it is shown
        setTimeout(() => {
          this.visible = false;
          // Reset the toast message after it is displayed
          this.wishlistService.clearToastMessage();
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.toastSub) {
      this.toastSub.unsubscribe();
    }
  }
}
