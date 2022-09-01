import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormSection } from '../models/formSection';
import { SECTIONS } from '../sections';
import { FormObj, FormValues } from '../models/formObj';
import { LocalService } from './local.service';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private formBuilder: FormBuilder,
    private localStore: LocalService
  ) {}

  private localStorageData = this.localStore.getData('wmakret-promotion-forms');
  getLocalStorage = () =>
    this.localStorageData ? JSON.parse(this.localStorageData) : [];

  formsArray: FormObj[] = this.getLocalStorage();

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

  addFormToArray(formName: string, formValues: FormGroup<any>) {
    this.formsArray.push({
      id: this.formsArray.length + 1,
      name: formName,
      values: formValues,
    });
    this.localStore.saveData(
      'wmakret-promotion-forms',
      JSON.stringify(this.formsArray)
    );
  }

  getFormToEdit(id: number): FormGroup<any> {
    const formToEdit = this.formsArray.filter((form) => form.id == id);
    return formToEdit[0].values;
  }

  deleteFormFromArray(id: number) {
    this.formsArray = this.formsArray.filter((form) => form.id !== id);
    this.localStore.saveData(
      'wmakret-promotion-forms',
      JSON.stringify(this.formsArray)
    );
  }
}
