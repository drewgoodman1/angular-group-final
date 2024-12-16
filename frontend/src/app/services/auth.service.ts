import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://backend urll';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };

    // return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    //   tap((response: any) => {
    //     localStorage.setItem('user', JSON.stringify(response));
    //   })
    // );
    const dummyResponse = {
      id: 1,
      profile: { firstName: "John", lastName: "Doe" },
      admin: true,
      active: true,
      status: "Online",
      companies: [
        { id: 101, name: "Tech Corp" },
        { id: 102, name: "Innovate Ltd" },
      ],
      teams: [
        { id: 201, name: "Development Team" },
        { id: 202, name: "QA Team" },
      ],
    };

    // Return dummy response wrapped in an Observable
    return of(dummyResponse).pipe(
      tap((response: any) => {
        // Save response to localStorage
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    return user ? user.admin : false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
