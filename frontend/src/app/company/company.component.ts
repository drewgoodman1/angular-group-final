import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {
  companies: { id: number; name: string }[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const companyTuples = this.authService.getCompanyNames();
    this.companies = companyTuples.map(([id, name]) => ({ id, name }));
  }

  onCompanySelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      const selectedCompanyId = +target.value;
      this.authService.setCompany(selectedCompanyId);
      this.router.navigate(['/home']);
    }
  }
}
