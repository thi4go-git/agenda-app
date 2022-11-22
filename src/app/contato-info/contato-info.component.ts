import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contato } from '../contato/contato';

@Component({
  selector: 'app-contato-info',
  templateUrl: './contato-info.component.html',
  styleUrls: []
})
export class ContatoInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContatoInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato
  ) { }

  ngOnInit(): void {
  }

  fecharDialog() {
    this.dialogRef.close();
  }

}
