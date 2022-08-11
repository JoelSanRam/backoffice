import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookingtraslado',
  templateUrl: './bookingtraslado.component.html',
  styleUrls: ['./bookingtraslado.component.sass']
})
export class BookingtrasladoComponent implements OnInit {
  bookingTrasladoForm: FormGroup;
  optionsPersona=[
    {
      id:'1',
      name:'Sr.'
    },
    {
      id:'2',
      name:'Sra.'
    },
    {
      id:'3',
      name:'Srita'
    },
    {
      id:'4',
      name:'Joven'
    },
    {
      id:'5',
      name:'Otro'
    }
]

  constructor( private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.bookingTrasladoForm = this.fb.group({
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      observations: ['', Validators.required],
      optionPerson:['', Validators.required]

  });
  }

  onReserve=()=>{}

}
