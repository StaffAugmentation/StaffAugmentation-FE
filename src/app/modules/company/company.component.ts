import { Component, OnInit } from '@angular/core';
import { Company } from '@models/company';
import { CompanyService } from '@services/company.service';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  Companies: Company[] = [];

  constructor(private companyService: CompanyService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.Companies = res;
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: err.error });
      }
    });
  }

}
