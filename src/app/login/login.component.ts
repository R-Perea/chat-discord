import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authError: any;
  email: string = ''; // Define la propiedad email e inicialízala como una cadena vacía.
  password: string = ''; // Define la propiedad password e inicialízala como una cadena vacía.
  userEmail: string = '';

  constructor(
    public auth: AngularFireAuth,
    private router:Router
    ) {}

  login() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Aquí puedes redirigir al usuario o realizar otras acciones después de iniciar sesión.
        console.log('Inició sesión correctamente');
        console.log(userCredential);

        // console log el correo del usuario
        console.log(userCredential.user?.email);
        this.userEmail = userCredential.user?.email || '';

        this.router.navigateByUrl('chat')
      })
      .catch((error) => {
        // Manejo de errores
        console.log('Ocurrió un error al iniciar sesión');
        console.log(error);
      });
  }
}
