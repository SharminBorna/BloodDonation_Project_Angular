import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/mat/mat.module';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { BloodgroupViewComponent } from './components/bloodgroup/bloodgroup-view/bloodgroup-view.component';
import { BloodgroupCreateComponent } from './components/bloodgroup/bloodgroup-create/bloodgroup-create.component';
import { BloodgroupEditComponent } from './components/bloodgroup/bloodgroup-edit/bloodgroup-edit.component';
import { LocationViewComponent } from './components/location/location-view/location-view.component';
import { LocationCreateComponent } from './components/location/location-create/location-create.component';
import { LocationEditComponent } from './components/location/location-edit/location-edit.component';
import { HospitalViewComponent } from './components/hospital/hospital-view/hospital-view.component';
import { HospitalCreateComponent } from './components/hospital/hospital-create/hospital-create.component';
import { HospitalEditComponent } from './components/hospital/hospital-edit/hospital-edit.component';
import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { HospitalService } from './services/hospital.service';
import { NotifyService } from './services/notify.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from './components/dialog/confirm-delete-dialog/confirm-delete-dialog.component';
import { LocationService } from './services/location.service';
import { BloodGroupService } from './services/blood-group.service';
import { BloodrequestViewComponent } from './components/bloodrequest/bloodrequest-view/bloodrequest-view.component';
import { BloodrequestCreateComponent } from './components/bloodrequest/bloodrequest-create/bloodrequest-create.component';
import { BloodrequestEditComponent } from './components/bloodrequest/bloodrequest-edit/bloodrequest-edit.component';
import { BloodstockViewComponent } from './components/bloodstock/bloodstock-view/bloodstock-view.component';
import { BloodstockCreateComponent } from './components/bloodstock/bloodstock-create/bloodstock-create.component';
import { BloodstockEditComponent } from './components/bloodstock/bloodstock-edit/bloodstock-edit.component';
import { DonatebloodViewComponent } from './components/donateblood/donateblood-view/donateblood-view.component';
import { DonatebloodCreateComponent } from './components/donateblood/donateblood-create/donateblood-create.component';
import { DonatebloodEditComponent } from './components/donateblood/donateblood-edit/donateblood-edit.component';
import { ProfileService } from './services/profile.service';
import { BloodRequestService } from './services/blood-request.service';
import { DonateBloodService } from './services/donate-blood.service';
import { BloodStockService } from './services/blood-stock.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    BloodgroupViewComponent,
    BloodgroupCreateComponent,
    BloodgroupEditComponent,
    LocationViewComponent,
    LocationCreateComponent,
    LocationEditComponent,
    HospitalViewComponent,
    HospitalCreateComponent,
    HospitalEditComponent,
    ProfileViewComponent,
    ProfileCreateComponent,
    ProfileEditComponent,
    ConfirmDeleteDialogComponent,
    BloodrequestViewComponent,
    BloodrequestCreateComponent,
    BloodrequestEditComponent,
    BloodstockViewComponent,
    BloodstockCreateComponent,
    BloodstockEditComponent,
    DonatebloodViewComponent,
    DonatebloodCreateComponent,
    DonatebloodEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      MatModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ],
  providers: [HospitalService, NotifyService, DatePipe, LocationService, BloodGroupService, ProfileService, BloodRequestService, DonateBloodService, BloodStockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
