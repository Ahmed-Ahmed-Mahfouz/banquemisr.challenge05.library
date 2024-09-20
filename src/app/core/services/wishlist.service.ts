import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: any[] = [];
  private storageKey = 'wishlist';

  // BehaviorSubject to track toast visibility and message
  private toastMessageSubject = new BehaviorSubject<{
    message: string;
    icon: 'success' | 'warning';
  }>({ message: '', icon: 'success' });
  toastMessage$ = this.toastMessageSubject.asObservable();

  constructor() {
    this.loadWishlist();
  }

  getWishlist() {
    return this.wishlist;
  }

  addToWishlist(book: any) {
    try {
      if (this.isInWishlist(book)) {
        this.showToast('Book is already in the wishlist.', 'warning');
      } else {
        this.wishlist.push(book);
        this.saveWishlist();
        this.showToast('Book added to Wishlist successfully.', 'success');
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

  private showToast(message: string, icon: 'success' | 'warning') {
    this.toastMessageSubject.next({ message, icon });
  }

  clearToastMessage() {
    this.toastMessageSubject.next({ message: '', icon: 'success' });
  }
}
