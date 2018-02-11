import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { data } from './data-table-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataResource = new DataTableResource(data);
  data = [];
  dataCount = 0;

  @ViewChild(DataTable) dataTable;


  constructor() {
    this.dataResource.count().then(count => this.dataCount = count);
  }

  reloadData(params) {
    this.dataResource.query(params).then(data => this.data = data);
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  };

  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  ngOnInit() {
  }

}
