import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-model-contact',
  templateUrl: './model-contact.component.html',
  styleUrls: ['./model-contact.component.css']
})
export class ModelContactComponent {
  @Input() contactData: any
}
