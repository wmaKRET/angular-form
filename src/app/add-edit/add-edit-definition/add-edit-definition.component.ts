import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-definition',
  templateUrl: './add-edit-definition.component.html',
  styleUrls: ['./add-edit-definition.component.scss'],
})
export class AddEditDefinitionComponent implements OnInit {
  @Input() promotionForm!: FormGroup;
  @Input() submitted!: boolean;
  @Output() enableOtherSectionsEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  get getMarketingName() {
    return this.promotionForm.get('description.marketingName');
  }

  get getPortal() {
    return this.promotionForm.get('conditions.portal');
  }

  get getType() {
    return this.promotionForm.get('conditions.type');
  }

  get getStartDate() {
    return this.promotionForm.get('conditions.startDate');
  }

  get getValidator() {
    const finishDateValue = this.promotionForm.get(
      'conditions.finishDate'
    )?.value;
    // if Finish Date have no value don't run validator
    if (!finishDateValue) return false;
    return this.promotionForm.validator;
  }

  enableOtherSections(): void {
    const markName = this.promotionForm.value.description.marketingName;
    const techName = this.promotionForm.value.description.technicalName;
    if (markName || techName) this.enableOtherSectionsEvent.emit(true);
    else this.enableOtherSectionsEvent.emit(false);
  }
}
