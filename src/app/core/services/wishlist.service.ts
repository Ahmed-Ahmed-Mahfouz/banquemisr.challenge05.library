import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: any[] = [];
  private storageKey = 'wishlist';

  constructor() {
    this.loadWishlist();
  }

  getWishlist() {
    return this.wishlist;
  }

  addToWishlist(book: any) {
    if (this.isInWishlist(book)) {
      this.showToast('toast-warning');
    } else {
      this.wishlist.push(book);
      this.saveWishlist();
      this.showToast('toast-success');
    }
  }

  removeFromWishlist(book: any) {
    this.wishlist = this.wishlist.filter((item) => item.key !== book.key);
    this.saveWishlist();
  }

  isInWishlist(book: any): boolean {
    return this.wishlist.some((item) => item.key === book.key);
  }

  private saveWishlist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
  }

  private loadWishlist() {
    const storedWishlist = localStorage.getItem(this.storageKey);
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  private showToast(toastId: string) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    }
  }
}
