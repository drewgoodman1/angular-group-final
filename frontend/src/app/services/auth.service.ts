import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:8080/`;

  constructor(private http: HttpClient) { }
  //   {
  //     "username": "cousingreg",
  //     "password": "mosteligiblebachelor"
  // }



  login(username: string, password: string): Observable<Object> {
    console.log('Attempting to log in with:', { username, password }); // Debugging input
    return this.http.post(`${this.apiUrl}users/login`, {
      username,
      password,
    }).pipe(
      tap((response) => {
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  getAnnouncements(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}company/${id}/announcements`);
  }

  postAnnouncement(companyId: number, title: string, message: string): Observable<any> {
    const user = this.getLoggedInUser();
    if (!user) {
      throw new Error('User is not logged in');
    }
  
    const body = {
      title,
      message,
      author: {
        id: user.id,
        profile: {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          email: user.profile.email,
          phone: user.profile.phone,
        },
      },
    };
  
    return this.http.post(`${this.apiUrl}company/${companyId}/announcements`, body);
  }
  


  getLoggedInUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    return user ? user.admin : false;
  }
  getUserRole(): string {
    const user = this.getLoggedInUser();
    if (user && typeof user.admin !== 'undefined') {
      return user.admin ? 'admn' : 'wrkr';
    }
    return 'none';
  }

  // Gets the company names for admins only from the user object
  getCompanyNames(): [number, string][] {
    const user = this.getLoggedInUser();
    const companiesArray = user.companies;
    const companyNames: [number, string][] = [];
    for (const company of companiesArray) {
      companyNames.push([company.id, company.name]);
    }
    console.log(companyNames);
    return companyNames;
  }

  // Method to fetch teams for a specific company
  getTeams(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}company/${companyId}/teams`);
  }

  // Sets the selected company
  setCompany(companyId: number): void {
    localStorage.setItem('selectedCompany', companyId.toString());
    console.log(localStorage.getItem('selectedCompany') || "")
  }

  getCompanyId(): string {
    console.log(localStorage.getItem('selectedCompany') || "")
    return localStorage.getItem('selectedCompany') || "";
  }

  getAdminCompanies(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.apiUrl}/admin/companies`);
  }
  


  isLoggedIn(): boolean {
    return !!this.getLoggedInUser();
  }


  logout(): void {
    localStorage.removeItem('user');
  }

}
