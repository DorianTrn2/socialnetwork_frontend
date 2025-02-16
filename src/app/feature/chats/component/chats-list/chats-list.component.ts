import {Component, inject, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import {APP_URL} from "src/app/core/constant/url.constant";
import {ChatService} from "../../chats.service"
import { ChatsMessageComponent } from '../chats-message/chats-message.component';
import { XhrFactory } from '@angular/common';

@Component({
  selector: 'app-chats',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent {

  @Input() chats: any[] = [];
  
  public userImages: { [username: string]: string } = {};
  protected readonly APP_URL = APP_URL;
  private readonly router: Router = inject(Router);
  private readonly chatService: ChatService = inject(ChatService);


  constructor(private dialog: MatDialog) {}

  ngOnInit(){
    this.chatService.getchats()
    .subscribe({
      next: (response: any[]) =>{
        console.log('Chats: ', response);
        this.chats = response;
        response.forEach(chat=>{
          this.loadUserImage(chat.user1.username);
          this.loadUserImage(chat.user2.username);
        })
      },
      error: (error: any) =>{
        console.error("Error: ", error);
      }
    })
  }

  userImage(username: string){
    this.chatService.getuserimageurl(username)
    .subscribe({
      next: (response: any)=>{
        console.log(response);
        return response;
      }
    })
  }

  openChat(chatId: string) {
    this.dialog.open(ChatsMessageComponent, {
      width: '600px',
      data: { chatId: chatId },
    });
  }
  
  loadUserImage(username: string) {
    console.log("loadUserImage");
    if (!this.userImages[username]) {
      this.chatService.getuserimageurl(username).subscribe({
        next: (response: any) => {
          this.userImages[username] = response;
        },
        error: (error: any) => {
          console.error('Error fetching user image:', error);
          this.userImages[username] = 'https://via.placeholder.com/50';
        }
      });
    }
  }
  


}
