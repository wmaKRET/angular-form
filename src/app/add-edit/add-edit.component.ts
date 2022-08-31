import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FormSection } from '../models/formSection';
import { FormService } from '../services/form.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  constructor(
    private formService: FormService,
    private localStore: LocalService,
    private router: Router
  ) {}

  formSectionsArray!: FormSection[];
  activeSectionId!: number;
  promotionForm!: FormGroup;

  ngOnInit(): void {
    this.getFormSections();
    this.getFirstActiveSectionId();
    this.createNewForm();
    this.populateFormWithValues();
  }

  getFormSections(): void {
    this.formService
      .getFormSections()
      .subscribe((sections) => (this.formSectionsArray = sections));
  }

  getFirstActiveSectionId(): void {
    this.activeSectionId = this.formSectionsArray[0].id;
  }

  createNewForm(): void {
    this.promotionForm = this.formService.createForm();
  }

  populateFormWithValues(): void {
    const savedFormValues = this.localStore.getData('wmakret-promotion-form');
    // if some values are saved in local storage then set form values
    if (savedFormValues)
      this.promotionForm.setValue(JSON.parse(savedFormValues));
  }

  changeActiveSection(id: number): void {
    const section = this.formSectionsArray.find((section) => section.id === id);
    // if section is not disabled (isDisabled is false) then update active section id
    if (!section?.isDisabled) this.activeSectionId = id;
  }

  enableOtherSections(isNameFilled: boolean): void {
    const isSecondSectionDisabled = this.formSectionsArray[1].isDisabled;
    if (isSecondSectionDisabled && isNameFilled) {
      this.formSectionsArray = this.formSectionsArray.map((section) =>
        section.id === 1 ? section : { ...section, isDisabled: false }
      );
    } else if (!isSecondSectionDisabled && !isNameFilled) {
      this.formSectionsArray = this.formSectionsArray.map((section) =>
        section.id === 1 ? section : { ...section, isDisabled: true }
      );
    }
  }

  handleFormChange(): void {
    const formValues = this.promotionForm.value;
    this.localStore.saveData(
      'wmakret-promotion-form',
      JSON.stringify(formValues)
    );
  }

  handleFormSubmit(): void {
    const formValues = this.promotionForm.value;
    this.formService.addFormToArray(formValues);
    this.localStore.removeData('wmakret-promotion-form');
    this.router.navigate(['']);
  }
}
