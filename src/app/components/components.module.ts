import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ResultsComponent } from './results/results.component';
import { ResultComponent } from './result/result.component';




@NgModule({
  declarations: [
    ResultComponent,
    ResultsComponent,
  ],
    imports: [
    CommonModule,
    IonicModule
  ],
    exports: [
      ResultsComponent,
     
    ]
})
export class ComponentsModule { }
