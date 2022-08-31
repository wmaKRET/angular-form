import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddEditMenuComponent } from './add-edit/add-edit-menu/add-edit-menu.component';
import { AddEditDefinitionComponent } from './add-edit/add-edit-definition/add-edit-definition.component';
import { AddEditPageComponent } from './add-edit/add-edit-page/add-edit-page.component';
import { AddEditSummaryComponent } from './add-edit/add-edit-summary/add-edit-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddEditComponent,
    AddEditMenuComponent,
    AddEditDefinitionComponent,
    AddEditPageComponent,
    AddEditSummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
