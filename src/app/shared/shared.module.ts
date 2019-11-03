import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentDatePipe } from './pipe/comment-date.pipe';

@NgModule({
  declarations: [
    CommentDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    CommentDatePipe
  ],
})
export class SharedModule { }
