import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FormSection } from '../models/formSection';
import { FormService } from '../services/form.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  formSectionsArray!: FormSection[];
  activeSectionId!: number;
  promotionForm!: FormGroup;
  isEditMode!: boolean;
  formToEditId!: number;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
    this.formToEditId = this.route.snapshot.params['id'];
    this.isEditMode = Boolean(this.formToEditId);

    this.getFormSections();
    this.getFirstActiveSectionId();
    this.createNewForm();

    if (this.isEditMode) {
      this.populateValuesToEdit(this.formToEditId);
    } else this.populateFormFromLocalStorage();
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

  // populates new form with values from form chosen to edit
  populateValuesToEdit(id: number): void {
    const formToEdit = this.formService.getFormToEdit(Number(id));
    this.promotionForm.setValue(formToEdit);
    this.enableOtherSections(true);
  }

  populateFormFromLocalStorage(): void {
    const savedFormValues = this.localStore.getData('wmakret-promotion-form');
    // if some values are saved in local storage then set form values
    if (savedFormValues) {
      this.promotionForm.setValue(JSON.parse(savedFormValues));
      const markName = this.promotionForm.value.description.marketingName;
      const techName = this.promotionForm.value.description.technicalName;
      if (markName || techName) this.enableOtherSections(true);
    }
  }

  changeActiveSection(id: number): void {
    const section = this.formSectionsArray.find((section) => section.id === id);
    // if section is not disabled (isDisabled is false) then update active section id
    if (!section?.isDisabled) this.activeSectionId = id;
  }

  // enables other sections (changes its isDisabled value) if user entered Marketing or Technical name
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

  clearLocalStorageAndNavigateToList(): void {
    this.localStore.removeData('wmakret-promotion-form');
    this.router.navigate(['']);
  }

  handleFormSubmit(): void {
    this.submitted = true;
    const formName = this.promotionForm.value.description.marketingName;
    const formValues = this.promotionForm.value;

    if (this.promotionForm.invalid) {
      this.changeActiveSection(1);
      return;
    }

    if (this.isEditMode) {
      this.formService.updateForm(
        Number(this.formToEditId),
        formName,
        formValues
      );
      this.clearLocalStorageAndNavigateToList();
    } else {
      this.formService.addFormToArray(formName, formValues);
      this.clearLocalStorageAndNavigateToList();
    }
  }
}
