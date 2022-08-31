import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-definition',
  templateUrl: './add-edit-definition.component.html',
  styleUrls: ['./add-edit-definition.component.scss'],
})
export class AddEditDefinitionComponent implements OnInit {
  @Input() promotionForm!: FormGroup;
  @Output() enableOtherSectionsEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  enableOtherSections(): void {
    const markName = this.promotionForm.value.description.marketingName;
    const techName = this.promotionForm.value.description.technicalName;
    if (markName || techName) this.enableOtherSectionsEvent.emit(true);
    else this.enableOtherSectionsEvent.emit(false);
  }
}
