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
        const loggedInUser = this.authService.getLoggedInUser();
        console.log(loggedInUser);
  
        if (loggedInUser.admin) {
          console.log('Navigating to company dropdown for admin');
          this.router.navigate(['/company']); // Navigate to company component
        } else {
          console.log('Navigating to homepage for non-admin');
          this.router.navigate(['/home']); // Navigate to homepage component
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid username or password');
      },
    });
  }
  
}
