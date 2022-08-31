import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddEditMenuComponent } from './add-edit/add-edit-menu/add-edit-menu.component';

@NgModule({
  declarations: [AppComponent, ListComponent, AddEditComponent, AddEditMenuComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
