import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css'],
})
export class AnnouncementCardComponent {
  @Input() announcement: { author: string; date: string; message: string } = {
    author: '',
    date: '',
    message: '',
  };
}
