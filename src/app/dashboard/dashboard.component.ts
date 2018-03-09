import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  complex_object: any
  simpleText = '';
  itemsRef: AngularFireList<any>;
  mainRef: AngularFireList<any>;
  constructor(db: AngularFireDatabase, private toastr: ToastrService) {
    this.mainRef = db.list('pushnotification');
    this.itemsRef = db.list('pushnotification/12');


  }

  ngOnInit() {

    const local_complex_object = localStorage.getItem('currentUser')
    this.complex_object = JSON.parse(local_complex_object);

    this.showWelcomeNote();
    this.showUserNotification();
  }

  public showWelcomeNote() {
    this.mainRef.snapshotChanges(['child_added']).subscribe(action => {
      action.forEach(action => {
        if (action.key === 'Welcome Note') {
          this.toastr.success(action.payload.val());
        }
      });
    });
  }

  public showUserNotification() {


    this.itemsRef.snapshotChanges(['child_added']).subscribe(actions => {
      actions.forEach(action => {
        this.toastr.success(action.payload.val().name);
        this.itemsRef.remove(action.payload.key);
      });
    });
  }



  public onclickToster(simpleText: string) {
    this.itemsRef.push({ name: simpleText });
  }


  /* addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  } */

}
