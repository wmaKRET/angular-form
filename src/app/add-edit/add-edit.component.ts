import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormSection } from '../models/formSection';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  constructor(public formService: FormService) {}
  formSectionsArray!: FormSection[];
  activeSectionId!: number;
  promotionForm!: FormGroup;

  ngOnInit(): void {
    this.getFormSections();
    this.getFirstActiveSectionId();
    this.createNewForm();
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

  changeActiveSection(id: number): void {
    const section = this.formSectionsArray.find((section) => section.id === id);
    // if section is not disabled (isDisabled is false) then update active section id
    if (!section?.isDisabled) this.activeSectionId = id;
  }
}
