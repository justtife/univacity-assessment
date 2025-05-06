import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicComponents } from '../ionic-components';
@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
  standalone: true,
  imports: [IonicComponents]
})
export class LoadMoreComponent {
  @Input() batchSize: number = 0;// Number of items to load per batch
  @Input() totalContent: number = 0;// Total number of items
  @Input() loadedDataLength: number = 0;// Number of items already loaded
  @Output() loadData = new EventEmitter<number>();// Emit the number of items to load
  isLoading = false;
  loadMore(event: any) {
    if (this.isLoading || this.loadedDataLength >= this.totalContent) {
      // Disable further loading if everything is already loaded
      event.target.disabled = true;
      return;
    }
    this.isLoading = true; // Start loading
    setTimeout(() => {
      const remainingData = this.totalContent - this.loadedDataLength;
      const nextBatchSize = remainingData > this.batchSize ? this.batchSize : remainingData;
      this.loadData.emit(nextBatchSize);  // Emit the batch size to load
      if (this.loadedDataLength + nextBatchSize >= this.totalContent) {
        event.target.disabled = true;
      }
      console.log(this.loadedDataLength)
      this.isLoading = false;
      event.target.complete();
    }, 1500);
  }
}
