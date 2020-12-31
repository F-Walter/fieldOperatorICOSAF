import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UseCaseAComponent } from './components/UC-A/use-case-a.component';
import { NotificationFieldOperatorComponent } from './components/UC-A/fieldOperatorNotification/notification-field-operator.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    LoginDialogComponent,

    AppComponent,
    ToolbarComponent,
    LoginDialogComponent,
    NotificationComponent,
    UseCaseAComponent,
    NotificationFieldOperatorComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
