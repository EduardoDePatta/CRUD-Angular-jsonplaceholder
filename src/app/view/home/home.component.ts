import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/components/element-dialog/element-dialog.component';
import { ViewChild } from '@angular/core';
import { Register } from 'src/app/models/Register';

const ELEMENT_DATA: Register[] = [];
var contador: Array<any> = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];

  dataSource!: Register[];


  setPosts(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        this.dataSource = json;
        contador = this.dataSource;
        console.log(contador.length)
      });
  }

  constructor(public dialog: MatDialog) {
    this.setPosts();
  }

  ngOnInit(): void {
  }

  openDialog(element: Register | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data:
        element === null
          ? {

              id: null,
              name: '',
              email: '',
              phone: '',
            }
          : {
              id: element.id,
              name: element.name,
              email: element.email,
              phone: element.phone,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((p) => p.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
          alert('Registro Atualizado');
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter((p) => p.id !== id);
    alert(`Registro removido`);
  }

  editElement(element: Register): void {
    this.openDialog(element);
  }




}
export { contador };
/*
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/components/element-dialog/element-dialog.component';
import { ViewChild } from '@angular/core';
import { Register } from 'src/app/models/Register';

const ELEMENT_DATA: Register[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'userId', 'title', 'body', 'actions'];

  dataSource!: Register[];


  setPosts(): void {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        this.dataSource = json;
      });
  }

  constructor(public dialog: MatDialog) {
    this.setPosts();
  }

  ngOnInit(): void {
  }

  openDialog(element: Register | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data:
        element === null
          ? {
              id: null,
              userId: null,
              title: '',
              body: '',
            }
          : {
              id: element.id,
              userId: element.userId,
              title: element.title,
              body: element.body,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((p) => p.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
          alert('Registro Atualizado');
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
          alert('Registro NÃO FOI Atualizado');
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter((p) => p.id !== id);
    alert(`Registro removido`);
  }

  editElement(element: Register): void {
    this.openDialog(element);
  }



}

*/
