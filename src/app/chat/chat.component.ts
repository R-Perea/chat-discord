import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  messages: any[] | undefined;

  constructor(private db: AngularFireDatabase) {
    // Escucha los cambios en la base de datos de Firebase para recibir mensajes en tiempo real.
    db.list('messages').valueChanges().subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage(message: string) {
    // Guarda el mensaje en la base de datos de Firebase.
    this.db.list('messages').push({ text: message });
  }
}
