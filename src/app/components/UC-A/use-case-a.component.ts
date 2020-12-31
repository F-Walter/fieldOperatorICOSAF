/**
 * Component not used in this context, but added for managing the activity of the shop floor operator.
 * Nevertheless is only a mock definition because no functionality was implemented
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SseService } from 'src/app/services/SseService/sse-service.service';
import { UCCService } from 'src/app/services/UC-C/uc-c-service.service';
import { NotificationFieldOperatorComponent } from './fieldOperatorNotification/notification-field-operator.component';

// Element in the Prelievi panel
interface TaskFieldOperator {
  status: string
  det_short_id: string
}

@Component({
  selector: 'app-use-case-a',
  templateUrl: './use-case-a.component.html',
  styleUrls: ['./use-case-a.component.css']
})
export class UseCaseAComponent implements OnInit, AfterViewInit {

  currentTask: string
  taskOperList: any[]
  displayedColumns: string[] = ['status', 'det_short_id'];
  dataSource: MatTableDataSource<TaskFieldOperator>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  sseSubscription: Subscription;
  sseSubscriptionEvent: any;

  constructor(private sseService: SseService, private UCCService: UCCService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TaskFieldOperator>()
    this.sseSubscription = null
    this.sseSubscriptionEvent = null

  }

  ngOnInit(): void {

    //TODO richiedere per primo order non completo con oper id loggato per il momento è 1 
    this.UCCService.getTaskListOper(2, 2).subscribe((response: any[]) => {

      this.taskOperList = response
      console.log("PIPPO:" ,this.taskOperList);
      

      if (response.length != 0) {
        this.currentTask = response[0].task_descr.toString()
      } else {
        this.currentTask = "TASK NON DEFINITO"
      }

      let tasks = response.map(element => {
        return {
          status: element.task_status_id,
          det_short_id: element.det_short_id
        }
      })

      // Il primo elemento nella lista deve avere loop giallo
      for(let t of tasks){
        if(t.status != 2){
          t.status = 5
          break
        }
      }
      this.dataSource.data = [...tasks]
    })


    /**
     * Subscription to the source of events
     */
    this.sseSubscription = !this.sseSubscription ? this.sseService
      .getServerSentEvent("http://localhost:4200/API/solve_action")
      .subscribe(data => {

        let cobotName: string = data.cobot_name
        let typeofError: string = data.solve_act_descr
        let severity: string = data.severity == 1 ? "Alta" : "Bassa"
        let taskId: Number = data.task_id

        if (taskId) {

          const dialogRef = this.dialog.open(NotificationFieldOperatorComponent, {
            disableClose: true,
            width: 'auto',
            height: 'auto',
            data: {
              cobotName: cobotName,
              typeofError: typeofError,
              severity: severity,
              taskId: taskId,
              error: true
            }
          })

        }
      }) : null



    this.sseSubscriptionEvent = !this.sseSubscriptionEvent ? this.sseService
      .getServerSentEvent("http://localhost:4200/API/events")
      .subscribe(response => {

        //TODO vedere cosa viene ricevuto e mandare a NOTIFICATION COMPONENT il mach det it
        //console.log(response)
        let data = JSON.parse(response.data)
        console.log("DATA", data)
        this.checkIfMustBeShownNotification(Number(data.task_id), data)
      }) : null
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  checkIfMustBeShownNotification(taskId: number, data: any) {
    for (let taskOper of this.taskOperList) {
      console.log(taskOper)
      if (taskOper.task_id == taskId + 1) {


        //Se il task dell'operatore è il successivo rispetto a quello effettuato da AGV
        // ==> mostro notifica
        const dialogRef = this.dialog.open(NotificationFieldOperatorComponent, {
          disableClose: true,
          width: 'auto',
          height: 'auto',
          data: {
            workAreaId: data.area_id,
            taskId: data.task_id +1,
            error: false
          }
        })
        break;
      }
    }
  }



}
