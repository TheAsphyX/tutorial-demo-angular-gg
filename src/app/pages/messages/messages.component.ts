import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MOCK_MESSAGES } from 'src/app/mock/mock-messages';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor(private readonly messageService: MessageService) {
    
  }

  ngOnInit(): void {
    this.messageService.getAll()
      .pipe(
        map((messages: Message[]) => this.messages = messages)
      )
      .subscribe();
  }

}