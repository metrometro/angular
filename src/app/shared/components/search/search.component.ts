import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchInput: string = '';

  @Input() placeholder: string = '';

  @Output() search = new EventEmitter<string>();

  onSeachClick() {
    this.search.emit(this.searchInput);
  }
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
}

