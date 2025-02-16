import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {ChatService} from "@shared/chat/service/chats.service"


@Component({
  selector: 'app-chats',
  templateUrl: './chats-message.component.html',
  styleUrls: ['./chats-message.component.scss']
})
export class ChatsMessageComponent {
  chatId: string;
  messages: any[] = [];
  user1: any;
  user2: any;
  newMessage: string = '';
  private readonly chatService: ChatService = inject(ChatService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
  ) {
    this.chatId = data.chatId;
  }

  ngOnInit() {
    // Récupère les messages pour un chat spécifique
    const id = this.chatId;
    console.log("Chat id: ", id);
    this.chatService.getchatmessages(id).subscribe((chat) => {
      this.messages = chat.messages;
      this.user1 = chat.user1;
      this.user2 = chat.user2;
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return;
    }

    this.chatService.sendmessage(this.chatId, this.newMessage)
      .subscribe({
        next: (response: any) => {
          console.log("Message sent succesfully: ", response);
          this.newMessage = '';
        },
        error: (error: any) => {
          console.error("Error sending message: ", error);
        }
      })
  }
}
