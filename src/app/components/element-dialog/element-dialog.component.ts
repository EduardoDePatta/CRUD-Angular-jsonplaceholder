import { Component, OnInit, Inject } from '@angular/core';
import { Register } from 'src/app/models/Register';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: Register;
  isChange!: boolean;

  momentForm!: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Register,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }

  onCancel(): void {
    this.dialogRef.close();
    if(this.isChange){
      alert('Registro NÃO FOI Atualizado');
    } else{
      alert('Registro NÃO FOI Criado')
    }
  }

  submit(){

  }

}
