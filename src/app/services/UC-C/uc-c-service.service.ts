/*
This service has the role to manage the calls to the backend APIs
*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Order } from 'src/app/model/order.model';

import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UCCService {


  



  // The subject is used to communicate data among non related components, in particular the name of the workArea and the AGV
  private _subjectSelectedWorkAreaAndAgv: Subject<any[]>;

  public get subjectSelectedWorkAreaAndAgv(): Subject<any[]> {
    return this._subjectSelectedWorkAreaAndAgv;
  }
  public set subjectSelectedWorkAreaAndAgv(value: Subject<any[]>) {
    this._subjectSelectedWorkAreaAndAgv = value;
  }

  // To the component is given the Observable from the subject to reduce the rights
  public getSubjectSelectedWorkAreaAndAgv(): Observable<any[]> {
    return this._subjectSelectedWorkAreaAndAgv.asObservable();
  }

  // Processed order
  private _currentOrder: Order;

  public get currentOrder(): Order {

    if (this._currentOrder)
      return this._currentOrder;
    else {
      let currentOrder = JSON.parse(localStorage.getItem('currentOrder'))
      if (currentOrder)
        return currentOrder as Order
      else return null
    }
  }
  public set currentOrder(value: Order) {
    this._currentOrder = value;
  }

  constructor(private http: HttpClient) {
    this.subjectSelectedWorkAreaAndAgv = new Subject();
  }


  /**
   * Call to the backend in order to get the list of tasks given the order id and the agv id
   * @param order_id 
   * @param agv_id 
   */
  getTaskListAgv<Task>(order_id: Number, agv_id: Number): Observable<Task[]> {
    let url = `http://${environment.serverHost}/Details/getTaskListAgv?order_id=${order_id}&agv_id=${agv_id}`
    return this.http.get<Task[]>(url).pipe(retry(3))
  }

  getTaskListOper<Task>(order_id: Number, oper_id: Number): Observable<Task[]> {
    let url = `http://${environment.serverHost}/Details/getTaskListOper?order_id=${order_id}&oper_id=${oper_id}`
    return this.http.get<Task[]>(url).pipe(retry(3))
  }

  /**
   * Call to the backend in order to get the list of tasks given the order id
   * @param order_id 
   */
  getTaskListOrder<Task>(order_id: Number): Observable<Task[]> {
    let url = `http://${environment.serverHost}/Details/getTaskListOrder?order_id=${order_id}`
    return this.http.get<Task[]>(url).pipe(retry(3))

  }
  /**

   * Call to the backend in order to get the list of orders given the use case considered and the date 
   * @param uc : for the moment either UC-C or UC-A 
   * @param timestamp: classic timestamp in the form of a string
   */
  getOrdListByDateAndUC<Order>(uc: string, timestamp: string): Observable<Order[]> {
    let url = `http://${environment.serverHost}/Details/getOrdListbyDate?ts=${timestamp}&uc=${uc}`
    return this.http.get<Order[]>(url).pipe(retry(3))

  }
  /**
   * Call to inform the backend that a task is performed
   * @param task_id 
   */
  setTaskStatusOk(task_id: number) {
    let url = `http://${environment.serverHost}/Details/updateStatusOK?task_id=${task_id}`
    return this.http.get<any>(url).pipe(retry(3))
  }
  
  setTaskStatusNotOk(taskId: number,errorTypeId:number) {
    let url = `http://${environment.serverHost}/Details/updateStatusEr?task_id=${taskId}&error_type_id=${errorTypeId}`
    return this.http.get<any>(url).pipe(retry(3))
  }

  /**
   * Call to define the solve action to be performed whenever the operator is called in order to solve the problem rose during the process
   * @param solve_action_text: Action text selected 
   * @param operator_ass_id: for the moment 1
   * @param cobot_id
   * @param solve_act_mast_id: can be obtained from the error type id and the solve action type id
   * @param error_id
   * @param severity: 1-high, 2-low; if the call to the operator is urgent then 1 otherwise 2
   */
  setSolveAction(solve_action_text: string, operator_ass_id: number, cobot_id: number, solve_act_mast_id: number, error_id: number, severity: number): Observable<any> {
    let url = `http://${environment.serverHost}/Details/insertSolveAction?solve_action=${solve_action_text}&operator_ass_id=${operator_ass_id}&cobot_id=${cobot_id}&oper_exec_id=1&solve_act_mast_id=${solve_act_mast_id}&error_id=${error_id}&severity=${severity}`
    return this.http.get<any>(url).pipe(retry(3))
  }


  /**
   * Call to obtain the last signalled error given the task.  
   * @param task_id 
   * It returns an array but it can be either empty or with a single object  
   */
  getLastActiveError(task_id: number) {
    let url = `http://${environment.serverHost}/Details/getLastActError?task_id=${task_id}`
    return this.http.get<any>(url).pipe(retry(3))

  }
  /**
   * Whenever there is a call to the operator it is communicated the task to the operator
   * @param order_id 
   * @param oper_id 
   * @param agv_id 
   * @param mach_det_id 
   * @param task_descr 
   */
  createTaskOper(order_id: number, oper_id: number, agv_id: number, mach_det_id: string, task_descr: string): Observable<any> {
    let url = `http://${environment.serverHost}/Details/createTaskOper?order_id=${order_id}&oper_id=${oper_id}&agv_id=${agv_id}&match_det_id=${mach_det_id}task_descr=${task_descr}`
    return this.http.get<any>(url).pipe(retry(3))
  }

  /**
   * Call to have the details the details about a task
   * @param task_id 
   */
  getTaskDetails(task_id: Number): Observable<any> {
    let url = `http://${environment.serverHost}/Details/getTaskDetails?task_id=${task_id}`
    return this.http.get<any>(url).pipe(retry(3))
  }
  /**
   * Call to obtain the solve_act_mast_id given the error_type_id and the solve_action_type_id
   * @param error_type_id 
   * @param solve_action_type_id 
   */
  getMappingErAct(error_type_id: number, solve_action_type_id: number) {
    let url = `http://${environment.serverHost}/Details/getMappingErAct?error_type_id=${error_type_id}&solve_action_type_id=${solve_action_type_id}`
    return this.http.get<any>(url).pipe(retry(3))
  }
}


