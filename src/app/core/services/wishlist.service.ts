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
    try {
      if (this.isInWishlist(book)) {
        this.showToast('toast-warning');
      } else {
        this.wishlist.push(book);
        this.saveWishlist();
        this.showToast('toast-success');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }

  removeFromWishlist(book: any) {
    try {
      this.wishlist = this.wishlist.filter((item) => item.key !== book.key);
      this.saveWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }

  isInWishlist(book: any): boolean {
    try {
      return this.wishlist.some((item) => item.key === book.key);
    } catch (error) {
      console.error('Error checking wishlist:', error);
      return false;
    }
  }

  private saveWishlist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }

  private loadWishlist() {
    try {
      const storedWishlist = localStorage.getItem(this.storageKey);
      if (storedWishlist) {
        this.wishlist = JSON.parse(storedWishlist);
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }

  private showToast(toastId: string) {
    try {
      const toast = document.getElementById(toastId);
      if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
          toast.classList.add('hidden');
        }, 3000);
      }
    } catch (error) {
      console.error('Error showing toast:', error);
    }
  }
}
