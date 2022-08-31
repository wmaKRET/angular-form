import { Component, OnInit } from '@angular/core';

import { FormService } from '../services/form.service';
import { FormObj } from '../models/formObj';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  formsArray!: FormGroup<any>[];
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getForms();
    console.log(this.formsArray);
  }

  getForms(): void {
    this.formsArray = this.formService.formsArray;
  }
}
