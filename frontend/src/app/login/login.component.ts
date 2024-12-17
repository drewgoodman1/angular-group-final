import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login successful!');
        console.log(this.authService.getLoggedInUser())
        // this.router.navigate(['/ to home page']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid username or password');
      },
    });
  }
}
