import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JournalComponent } from './components/journal/journal.component';
import { EditComponent } from './components/edit/edit.component';
import {  ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DeleteComponent } from './components/delete/delete.component';
import { ToolComponent } from './components/tool/tool.component';

const appRoutes: Routes = [
{path:'',component: HomeComponent},
{path:'register',component: RegisterComponent},
{path:'login',component: LoginComponent},
{path:'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},
{path:'profile',component: ProfileComponent, canActivate:[AuthGuard]},
{path:'journal',component: JournalComponent, canActivate:[AuthGuard]},
{path:'edit/:id',component: EditComponent, canActivate:[AuthGuard]},
{path:'delete/:id',component: DeleteComponent, canActivate:[AuthGuard]},
{path:'tool',component: ToolComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    JournalComponent,
    EditComponent,
    DeleteComponent,
    ToolComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],

  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
