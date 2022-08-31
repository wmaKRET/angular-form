import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormSection } from 'src/app/models/formSection';

@Component({
  selector: 'app-add-edit-menu',
  templateUrl: './add-edit-menu.component.html',
  styleUrls: ['./add-edit-menu.component.scss'],
})
export class AddEditMenuComponent implements OnInit {
  @Input() formSectionsArray!: FormSection[];
  @Input() activeSectionId?: number;
  @Output() changeActiveSectionEvent = new EventEmitter<number>();

  changeActiveSection(id: number): void {
    this.changeActiveSectionEvent.emit(id);
  }

  constructor() {}

  ngOnInit(): void {}
}
