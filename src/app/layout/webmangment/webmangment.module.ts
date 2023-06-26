import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebmangmentRoutingModule } from './webmangment-routing.module';
import { WebmangmentComponent } from './webmangment.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    WebmangmentComponent
  ],
  imports: [
    CommonModule,
    WebmangmentRoutingModule,
    EditorModule,
    MatCardModule
  ]
})
export class WebmangmentModule { }
