import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  selectedCategory: string = 'Search Key Group';

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}
