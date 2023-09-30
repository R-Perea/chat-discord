import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authError: any;
  email: string = ''; // Define la propiedad email e inicialízala como una cadena vacía.
  password: string = ''; // Define la propiedad password e inicialízala como una cadena vacía.

  constructor(public auth: AngularFireAuth) {}

  login() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Aquí puedes redirigir al usuario o realizar otras acciones después de iniciar sesión.
      })
      .catch((error) => {
        // Manejo de errores
      });
  }
}
