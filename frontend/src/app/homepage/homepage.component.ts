import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path if necessary

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  announcements: any[] = []; // Announcements array initialized as empty
  newAnnouncement = { title: '', message: '' }; // New announcement data
  errorMessage: string | null = null; // To display error messages, if any
  companyId: number | null = null; // Dynamically selected company ID

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Retrieve the company ID from localStorage or AuthService
    this.companyId = +this.authService.getCompanyId(); // Assuming getCompanyId returns a string that needs to be converted to number

    if (this.companyId) {
      this.loadAnnouncements();
    } else {
      console.error('No company selected');
      this.errorMessage = 'Please select a company to view announcements.';
    }
  }

  loadAnnouncements(): void {
    if (this.companyId) {
      this.authService.getAnnouncements(this.companyId).subscribe({
        next: (data) => {
          // Transform API response if necessary
          this.announcements = data.map((announcement: any) => ({
            author: `${announcement.author.profile.firstName} ${announcement.author.profile.lastName}`,
            date: new Date(announcement.date).toLocaleDateString(),
            message: announcement.message,
          }));
        },
        error: (err) => {
          console.error('Failed to fetch announcements:', err);
          this.errorMessage = 'Could not load announcements. Please try again later.';
        },
      });
    }
  }

  showNewMenu() {
    const form = document.getElementById('newAnnouncementForm');
    if (form) form.style.display = 'flex';
  }

  hideNewMenu() {
    const form = document.getElementById('newAnnouncementForm');
    if (form) form.style.display = 'none';
  }

  submitAnnouncement(): void {
    if (!this.newAnnouncement.title || !this.newAnnouncement.message) {
      alert('Please fill out both the title and message.');
      return;
    }

    if (!this.companyId) {
      alert('No company selected.');
      return;
    }

    // Use AuthService to post the announcement to the correct company
    this.authService.postAnnouncement(this.companyId, this.newAnnouncement.title, this.newAnnouncement.message)
      .subscribe({
        next: (response: any) => {
          // Assuming response contains announcement details
          this.announcements.unshift({
            author: `${response.author.profile.firstName} ${response.author.profile.lastName}`,
            date: new Date(response.date).toLocaleDateString(),
            message: response.message,
          });

          this.hideNewMenu(); // Hide the form modal
          this.newAnnouncement = { title: '', message: '' }; // Reset the form
        },
        error: (err) => {
          console.error('Failed to create announcement:', err);
          alert('Failed to create announcement. Please try again.');
        },
      });
  }
}
