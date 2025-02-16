import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {APP_URL} from "src/app/core/constant/url.constant";
import {ChatService} from "../../chats.service"

@Component({
  selector: 'app-chats',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent {

  protected readonly APP_URL = APP_URL;
  private readonly router: Router = inject(Router);
  private readonly chatService: ChatService = inject(ChatService);


  public constructor(){}
  
  


}
