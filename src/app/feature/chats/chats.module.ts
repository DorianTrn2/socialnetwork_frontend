import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsListComponent } from './component/chats-list/chats-list.component';
import { ChatsMessageComponent } from './component/chats-message/chats-message.component'
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatsListComponent,
    ChatsMessageComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule
    
  ],
  exports: [  ]
})
export class ChatsModule { }
