import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './pipes/format-time.pipe';


@NgModule({
  declarations: [FormatTimePipe],
  imports: [CommonModule],
  exports: [CommonModule, FormatTimePipe],
})
export class SharedModule {}
