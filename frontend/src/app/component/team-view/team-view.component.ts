import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})

export class TeamViewComponent {
  teamName: string = "Team 1"
  numProjects: number = 6
  teamMembers: string[] = ["David", "Will", "Mona", "Drew"];
  private apiUrl = 'http://backend urll';
  @Input() teamId!: number;
  constructor(private http: HttpClient, private user: AuthService) { }
  login(username: string, password: string): Observable<any> {
    const userId = "24";



    return this.http.post(`${this.apiUrl}/users/${userId}`, "team").pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
    // const dummyResponse = {
    //   id: 1,
    //   profile: { firstName: "John", lastName: "Doe" },
    //   admin: true,
    //   active: true,
    //   status: "Online",
    //   companies: [
    //     { id: 101, name: "Tech Corp" },
    //     { id: 102, name: "Innovate Ltd" },
    //   ],
    //   teams: [
    //     { id: 201, name: "Development Team" },
    //     { id: 202, name: "QA Team" },
    //   ],
    // };

    // // Return dummy response wrapped in an Observable
    // return of(dummyResponse).pipe(
    //   tap((response: any) => {
    //     // Save response to localStorage
    //     localStorage.setItem('user', JSON.stringify(response));
    //   })
    // );
  }
}
