import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
constructor(public messageService: MessageService){}
}
