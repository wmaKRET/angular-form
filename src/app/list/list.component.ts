import { Component, OnInit } from '@angular/core';

import { FormService } from '../services/form.service';
import { FormObj } from '../models/formObj';
import { FormGroup } from '@angular/forms';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  formsArray!: FormObj[];
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getForms();
  }

  getForms(): void {
    this.formsArray = this.formService.formsArray;
  }

  deleteForm(name: string, id: number): void {
    if (confirm(`You're about to delete: ${name}`)) {
      this.formService.deleteFormFromArray(id);
      this.getForms();
    }
  }
}
