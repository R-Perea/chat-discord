import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// chat.model.ts
export interface Message {
  name: string; // Agrega la propiedad 'name'
  text: string;
  isEditing: boolean;
  editedText: string;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'], 
})
export class ChatComponent {
  messages: Observable<Message[]> | undefined;
  messageInput: string = '';
  userEmail: string = '';
  nameInput: string = '';
  private dbMessages: AngularFireList<any>;
  editingMessage: Message | null = null;

  constructor(
    private db: AngularFireDatabase,
    private authService: AngularFireAuth
  ) {
    this.dbMessages = db.list('mensaje');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user?.email || '';

      this.messages = this.dbMessages.valueChanges().pipe(
        map((messages) => {
          return messages.map((message) => {
            if (message.name && message.name.trim() !== 'Anónimo') {
              return message; // Mantén el mensaje tal como está
            } else {
              message.name = 'Anónimo'; // Establece 'Anónimo' como nombre si no se proporciona un nombre
              return message;
            };
          });
        })
      );
    });
  }

  sendMessage(message: string, name: string) {
    const displayName = name.trim() === '' ? this.userEmail : name;
    this.dbMessages.push({ name: displayName, text: message });
    this.messageInput = '';
    this.nameInput = '';
  }

  editMessage(message: Message) {
    this.editingMessage = message;
    this.editingMessage.editedText = message.text;
  }

  saveEditedMessage(message: Message) {
    if (message.isEditing) {
      // Actualiza el mensaje editado en la base de datos
      this.dbMessages.update(message.text, { text: message.editedText });
      // Restablece la edición
      message.isEditing = false;
      this.editingMessage = null;
    }
  }
}
