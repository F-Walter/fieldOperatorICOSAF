/**
 * Component not used in this context, but added for managing the activity of the shop floor operator.
 * Nevertheless is only a mock definition because no functionality was implemented
 */
import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
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
      console.log("TaskOperatorList:" ,this.taskOperList);
      

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

      // Il primo elemento nella lista che non è un errore deve avere loop giallo
      for(let t of tasks){
        if(t.status != 2 && t.status != 3){
          t.status = 5
          break
        }
      }
      this.dataSource.data = [...tasks]
    })


    /**
     * Subscription to the source of events SOLVE ACTION in case of errors signalled by the remote operator
     */
    this.sseSubscription = !this.sseSubscription ? this.sseService
      .getServerSentEvent("http://localhost:4200/API/solve_action")
      .subscribe(data => {        

        let res = JSON.parse(data.data)        

        console.log("DATA SU SOLVE_ACTION ",res);
        

        let cobotName: string = res.cobot_name
        let typeofError: string = res.solve_action_desc
        let severity: string = res.severity == 1 ? "Alta" : "Bassa"
        let taskId: Number = Number(res.task_id)

        
        console.log("taskId: " + taskId)

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
          this.onCloseFieldOperatorDialog(dialogRef,true)
        }
      }) : null




    this.sseSubscriptionEvent = !this.sseSubscriptionEvent ? this.sseService
      .getServerSentEvent("http://localhost:4200/API/events")
      .subscribe(response => {

        //TODO vedere cosa viene ricevuto e mandare a NOTIFICATION COMPONENT il mach det it
        //console.log(response)
        let data = JSON.parse(response.data)
        console.log("DATA su EVENTS", data)
        if(data.status == "OK")
          this.checkIfMustBeShownNotification(Number(data.task_id), data)
      }) : null
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  checkIfMustBeShownNotification(taskId: number, data: any) {
      for (let taskOper of this.taskOperList) {
        console.log(taskOper)

        //Se il task dell'operatore è il successivo rispetto a quello effettuato da AGV
        // ==> mostro notifica
        if (taskOper.task_id == taskId + 1) {
          const dialogRef = this.dialog.open(NotificationFieldOperatorComponent, {
            disableClose: true,
            width: 'auto',
            height: 'auto',
            data: {
              workAreaId: data.area_id,
              taskId: taskOper.task_id,
              error: false
            }
          })
          this.onCloseFieldOperatorDialog(dialogRef,false)
          break;
        }
        else{
          if(taskOper.task_id == taskId){
            this.ngOnInit()
          }
        }
      }
    
    
  }


  onCloseFieldOperatorDialog(dialogRef,dialogClosedAfterError:boolean){

    dialogRef.afterClosed().subscribe(data => {
      console.log("data received: ",data);
      console.log("dialogClosedAfterError ",dialogClosedAfterError);
      
        if(data.result == true){
          //operator selected "OK"
          console.log("OPERATOR CLICKED OK");

          this.UCCService.setTaskStatusOk(Number(data.task_id)).subscribe(_ => {

            // Se il dialog è stato chiuso a fronte di un errore per agv allora dialogClosedAfterError è true
            // Se true non è necessario fare nulla perchè hai risolto un errore di agv e non devi fare nulla
            if(!dialogClosedAfterError){

            let newDataSource = []

            for(let t of this.dataSource.data){
              // Il primo task da fare per operatore è stato effettuato
              if(Number(t.status) == 5 || Number(t.status) == 3)
                t.status = "2";
            }
            for(let t of this.dataSource.data){
              // Aggiornare la view mettendo il primo task operatore non esegito a 5
              if(t.status != "2"){
                t.status = "5"
              }
              newDataSource.push(t)
            }
            this.dataSource.data = [...newDataSource]
            console.log("newDatasource",newDataSource);
            console.log(this.dataSource.data);
            }
         
          })
        }
        else{
          //operator selected "NOT OK"
          console.log("Received false");


          if(!dialogClosedAfterError){
          let newDataSource = []

          for(let t of this.dataSource.data){
            // Il primo task da fare per operatore va aggiornato con errore
            if(Number(t.status) == 5)
              t.status = "3";
            
            newDataSource.push(t)

          }
          this.dataSource.data = [...newDataSource]
          console.log("newDatasource",newDataSource);
          console.log(this.dataSource.data);
        }
      }
         
    })

  }



}
