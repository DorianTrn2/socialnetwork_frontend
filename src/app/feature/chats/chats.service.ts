import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_CHAT_ENDPOINT, BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from 'src/app/core/constant/url.constant';

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    private base_url = BACKEND_URI+'/'+BACKEND_ENDPOINT.CHAT;
    private all_chats_url = this.base_url+'/'+BACKEND_CHAT_ENDPOINT.ALL;
    private new_chat_url = this.base_url+'/'+BACKEND_CHAT_ENDPOINT.NEW;
    private user_image_url = BACKEND_URI+'/'+BACKEND_ENDPOINT.USER;

    constructor(private http: HttpClient) {}

    public allchats(){
        return this.http.get<any>(this.all_chats_url, {withCredentials: true})
    }

    public getchats(){
        return this.http.get<any>(this.base_url, {withCredentials: true});
    }

    public getchatmessages(id: any){
        return this.http.get<any>(`${this.base_url}/${id}`, {withCredentials: true});
    }

    public sendmessage(id: any, message: string){
        const payload = {message}
        return this.http.post<any>(`${this.base_url}/${id}/new`, payload, {withCredentials: true});
    }

    public getuserimageurl(username: any){
        const image_url = `${this.user_image_url}/${username}/${BACKEND_USER_ENDPOINT.GET_IMAGE}`;
        return this.http.get<any>(image_url, {withCredentials: true});
    }

}
