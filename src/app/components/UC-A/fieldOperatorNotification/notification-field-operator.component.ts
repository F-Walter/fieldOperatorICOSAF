import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UCCService } from 'src/app/services/UC-C/uc-c-service.service';

@Component({
  selector: 'app-notification-field-operator',
  templateUrl: './notification-field-operator.component.html',
  styleUrls: ['./notification-field-operator.component.css']
})
export class NotificationFieldOperatorComponent implements OnInit {


  severity: string
  cobotName: string
  typeofError: string
  taskId: string
  error: boolean


  public dialogRef: MatDialogRef<NotificationFieldOperatorComponent>
  workAreaId: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data, private uccService: UCCService, private router: Router) {
    this.error = data.error

    if (this.error == true) {
      this.cobotName = data.cobotName ? data.cobotName : ""
      this.typeofError = data.typeofError ? data.typeofError : ""
      this.severity = data.severity ? data.severity : ""
    } else {
      this.workAreaId = data.workAreaId ? data.workAreaId : null
    }
    this.taskId = data.taskId ? data.taskId : null

  }

  ngOnInit(): void {
  }

  /**
 * Task effetuato con successo comunicare backend
 */
  ok() {
    this.uccService.setTaskStatusOk(Number(this.taskId)).subscribe(_ => {
      this.router.navigate(["Home"])
    })

  }

  /**
   * Task effetuato con errore comunicare backend
   */
  notOK() {

    //TODO per il momento è settato errorTypeId a 3 ma è da vedere quale valore inserire
    this.uccService.setTaskStatusNotOk(Number(this.taskId), 3).subscribe(_ => {
      this.router.navigate(["Home"])
    })

  }

}
