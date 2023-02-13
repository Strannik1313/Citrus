import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@components/wizard/wizard.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';
import { StepperModule } from '@modules/stepper/stepper.module';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { ServiceListComponent } from '@components/ui/service-list/service-list.component';
import { MasterFilterModule } from '@shared/master-filter/master-filter.module';
import { WizardConfirmStepComponent } from '@components/wizard/wizard-confirm-step/wizard-confirm-step.component';
import { WizardServiceChoiceStepComponent } from '@components/wizard/wizard-service-choice-step/wizard-service-choice-step.component';
import { WizardDateChoiceStepComponent } from '@components/wizard/wizard-date-choice-step/wizard-date-choice-step.component';
import { AutocompleteModule } from '@shared/autocomplete/autocomplete.module';
import { ScheduleModule } from '@shared/schedule/schedule.module';
import { MonthFilterModule } from '@shared/month-filter/month-filter.module';
import { DirectivesModule } from '@directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { WizardFeature } from '@components/wizard/state-management/wizard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WizardEffects } from '@components/wizard/state-management/wizard.effects';

@NgModule({
  declarations: [
    WizardComponent,
    WizardServiceChoiceStepComponent,
    WizardDateChoiceStepComponent,
    WizardConfirmStepComponent,
    FirstLetterUppercasePipe,
    ServiceListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    StepperModule,
    CalendarModule,
    AutocompleteModule,
    ScheduleModule,
    MasterFilterModule,
    MonthFilterModule,
    DirectivesModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: WizardComponent }]),
    StoreModule.forFeature(WizardFeature.name, WizardFeature.reducer),
    EffectsModule.forFeature([WizardEffects]),
    FormsModule,
  ],
})
export class WizardModule {}
