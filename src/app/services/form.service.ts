import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import { FormSection } from '../models/formSection';
import { SECTIONS } from '../sections';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  getFormSections(): Observable<FormSection[]> {
    const sections = of(SECTIONS);
    return sections;
  }

  createForm() {
    return this.formBuilder.group({
      description: this.formBuilder.group({
        marketingName: ['', Validators.required],
        technicalName: [''],
        description: [''],
      }),
      conditions: this.formBuilder.group({
        portal: ['', Validators.required],
        type: ['', Validators.required],
        benefitAmount: [''],
        startDate: ['', Validators.required],
        finishDate: [''],
        pricing: ['base'],
        combinePromotions: [true],
        backPromotion: [false],
      }),
    });
  }
}
