import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormSection } from '../models/formSection';
import { SECTIONS } from '../sections';
import { FormObj, FormValues } from '../models/formObj';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  formsArray: FormGroup<any>[] = [];

  addFormToArray(newValues: FormGroup<any>) {
    this.formsArray.push(newValues);
  }

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
