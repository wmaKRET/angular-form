import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormSection } from '../models/formSection';
import { SECTIONS } from '../sections';
import { SingleForm } from '../models/singleForm';
import { LocalService } from './local.service';
import { dateNotPastValidator } from '../helpers/date-not-past.validator';
import { finishNotBeforeValidator } from '../helpers/finish-not-before.validator';

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

  formsArray: SingleForm[] = this.getLocalStorage();

  // used to generate sections for Form Menu(add-edit-menu)
  getFormSections(): Observable<FormSection[]> {
    const sections = of(SECTIONS);
    return sections;
  }

  createForm() {
    return this.formBuilder.group(
      {
        description: this.formBuilder.group({
          marketingName: ['', Validators.required],
          technicalName: [''],
          description: [''],
        }),
        conditions: this.formBuilder.group({
          portal: ['', Validators.required],
          type: ['', Validators.required],
          benefitAmount: [''],
          startDate: ['', [Validators.required, dateNotPastValidator]],
          finishDate: [''],
          pricing: ['base'],
          combinePromotions: [true],
          backPromotion: [false],
        }),
      },
      {
        validators: finishNotBeforeValidator,
      }
    );
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

  getFormToEdit(formId: number): FormGroup<any> {
    const formToEdit = this.formsArray.filter((form) => form.id == formId);
    return formToEdit[0].values;
  }

  updateForm(formId: number, formName: string, formValues: FormGroup<any>) {
    this.formsArray = this.formsArray.map((form) =>
      form.id === formId
        ? { id: formId, name: formName, values: formValues }
        : form
    );
    this.localStore.saveData(
      'wmakret-promotion-forms',
      JSON.stringify(this.formsArray)
    );
  }

  deleteFormFromArray(formId: number) {
    this.formsArray = this.formsArray.filter((form) => form.id !== formId);
    this.localStore.saveData(
      'wmakret-promotion-forms',
      JSON.stringify(this.formsArray)
    );
  }
}
