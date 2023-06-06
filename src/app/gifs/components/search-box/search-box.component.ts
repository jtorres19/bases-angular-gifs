import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {
  }

  // searchTag(newTag: string): void {
  //   console.log(newTag);
  // }

  searchTag(): void {
    this.gifService.searchTag(this.tagInput.nativeElement.value);
    this.tagInput.nativeElement.value = '';
  }
}
