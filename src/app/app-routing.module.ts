import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { FormResponseComponent } from './components/form-response/form-response.component';

const routes: Routes = [
  {
    path:'',
    component:ReactiveFormComponent
  },
  {
    path:'form-response',
    component:FormResponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
