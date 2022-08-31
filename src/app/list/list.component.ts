import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  formsArray!: FormGroup[];
  constructor(private formService: FormService) {}

  ngOnInit(): void {}
}
