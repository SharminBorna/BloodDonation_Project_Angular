import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BloodgroupViewComponent } from './components/bloodgroup/bloodgroup-view/bloodgroup-view.component';
import { LocationViewComponent } from './components/location/location-view/location-view.component';
import { HospitalViewComponent } from './components/hospital/hospital-view/hospital-view.component';
import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';
import { HospitalCreateComponent } from './components/hospital/hospital-create/hospital-create.component';
import { HospitalEditComponent } from './components/hospital/hospital-edit/hospital-edit.component';
import { LocationCreateComponent } from './components/location/location-create/location-create.component';
import { LocationEditComponent } from './components/location/location-edit/location-edit.component';
import { BloodgroupEditComponent } from './components/bloodgroup/bloodgroup-edit/bloodgroup-edit.component';
import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { BloodrequestViewComponent } from './components/bloodrequest/bloodrequest-view/bloodrequest-view.component';
import { DonatebloodViewComponent } from './components/donateblood/donateblood-view/donateblood-view.component';
import { BloodstockViewComponent } from './components/bloodstock/bloodstock-view/bloodstock-view.component';
import { BloodrequestCreateComponent } from './components/bloodrequest/bloodrequest-create/bloodrequest-create.component';
import { DonatebloodCreateComponent } from './components/donateblood/donateblood-create/donateblood-create.component';
import { BloodstockCreateComponent } from './components/bloodstock/bloodstock-create/bloodstock-create.component';
import { BloodstockEditComponent } from './components/bloodstock/bloodstock-edit/bloodstock-edit.component';
import { BloodrequestEditComponent } from './components/bloodrequest/bloodrequest-edit/bloodrequest-edit.component';
import { DonatebloodEditComponent } from './components/donateblood/donateblood-edit/donateblood-edit.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileViewComponent },
    { path: 'add-profile', component: ProfileCreateComponent },
    { path: 'edit-profile/:id', component: ProfileEditComponent },
    { path: 'bloodGroup', component: BloodgroupViewComponent },
    { path: 'edit-bloodGroup/:id', component: BloodgroupEditComponent },
    { path: 'location', component: LocationViewComponent },
    { path: 'add-location', component: LocationCreateComponent },
    { path: 'edit-location/:id', component: LocationEditComponent },
    { path: 'hospital', component: HospitalViewComponent },
    { path: 'add-hospital', component: HospitalCreateComponent },
    { path: 'edit-hospital/:id', component: HospitalEditComponent },
    { path: 'request', component: BloodrequestViewComponent },
    { path: 'add-request', component: BloodrequestCreateComponent },
    { path: 'edit-request/:id', component: BloodrequestEditComponent },
    { path: 'donate', component: DonatebloodViewComponent },
    { path: 'add-donate', component: DonatebloodCreateComponent },
    { path: 'edit-donate/:id', component: DonatebloodEditComponent },
    { path: 'stock', component: BloodstockViewComponent },
    { path: 'add-stock', component: BloodstockCreateComponent },
    { path: 'edit-stock/:id', component: BloodstockEditComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
