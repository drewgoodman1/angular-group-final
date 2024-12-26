import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path if necessary

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  announcements: any[] = []; // Announcements array initialized as empty
  errorMessage: string | null = null; // To display error messages, if any

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const companyId = 2; // Replace with the actual company ID if dynamic
    this.authService.getAnnouncements(companyId).subscribe({
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

  showNewMenu() {
    const form = document.getElementById('newAnnouncementForm');
    if (form) form.style.display = 'flex';
  }

  hideNewMenu() {
    const form = document.getElementById('newAnnouncementForm');
    if (form) form.style.display = 'none';
  }
}
