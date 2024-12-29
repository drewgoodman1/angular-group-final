import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path if necessary

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: any[] = []; // To store fetched teams
  errorMessage: string | null = null; // For error handling
  companyId: number | null = null; // Company ID from AuthService or localStorage
  newTeam = { name: '', description: '' }; // New team data
  isNewTeamFormVisible = false; // To control the visibility of the new team form

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get the company ID from AuthService or localStorage
    this.companyId = +this.authService.getCompanyId();

    if (this.companyId) {
      this.loadTeams();
    } else {
      this.errorMessage = 'No company selected';
    }
  }

  // Load teams based on the selected company
  loadTeams(): void {
    if (this.companyId) {
      this.authService.getTeams(this.companyId).subscribe({
        next: (data) => {
          this.teams = data;  // Assign the teams to the component's teams array
        },
        error: (err) => {
          console.error('Failed to fetch teams:', err);
          this.errorMessage = 'Could not load teams. Please try again later.';
        },
      });
    }
  }

  // Show the "New Team" form
  showNewMenu(): void {
    this.isNewTeamFormVisible = true;
  }

  // Hide the "New Team" form
  hideNewMenu(): void {
    this.isNewTeamFormVisible = false;
  }

  // Submit the new team form (optional)
  submitNewTeam(): void {
    if (!this.newTeam.name || !this.newTeam.description) {
      alert('Please fill out both the name and description.');
      return;
    }

    if (!this.companyId) {
      alert('No company selected.');
      return;
    }

    // Logic to create the new team (if needed)
    // this.authService.createTeam(this.companyId, this.newTeam.name, this.newTeam.description)
    //   .subscribe({
    //     next: (response) => {
    //       console.log('New team created:', response);
    //       this.teams.unshift(response);  // Add the new team to the list
    //       this.hideNewMenu();  // Hide the form modal
    //       this.newTeam = { name: '', description: '' };  // Reset the form
    //     },
    //     error: (err) => {
    //       console.error('Failed to create team:', err);
    //       alert('Failed to create team. Please try again.');
    //     },
    //   });
  }

  // Determine if the logged-in user is an admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}

