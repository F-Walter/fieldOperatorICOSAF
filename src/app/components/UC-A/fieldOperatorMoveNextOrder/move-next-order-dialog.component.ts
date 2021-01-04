import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-move-next-order-dialog',
  templateUrl: './move-next-order-dialog.component.html',
  styleUrls: ['./move-next-order-dialog.component.css']
})
export class MoveNextOrderDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // TODO on close you have to load the next order or not 
  closeDialog(moveNextOrder: boolean) {
    if(moveNextOrder){
      
    }
  }
}
