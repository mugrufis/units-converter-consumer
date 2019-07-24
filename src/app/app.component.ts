import {Component, OnInit} from '@angular/core';
import * as Converter from 'units-converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private functions: string[] = [];
  private units: any[] = [];
  private fromUnit: string;
  private toUnit: string;
  private selected: string;
  private fromValue: number;
  private toValue: number;

  // Where True is for fromValue and False for toValue
  private lastChanged = true;

  private onSelectionChangeType() {
    this.units = Converter[this.selected]().list();
    this.fromUnit = this.units[0].unit;
    this.toUnit = this.units[1].unit;
    this.fromValue = 1;
    this.toValue = Converter[this.selected](this.fromValue).from(this.fromUnit).to(this.toUnit).value;
  }

  private onSelectionChangeFrom(newValue?) {

    if (newValue && newValue.target.value as number) {

      this.toValue = (newValue.target.value as number > 1) ? newValue.target.value.replace(/^0+/, '') as number : newValue.target.value as number;
    } else if (newValue && newValue.target.value === '') {
      this.toValue = 0;
    }

    this.fromValue = Converter[this.selected](this.toValue).from(this.fromUnit).to(this.toUnit).value;
  }


  private onSelectionChangeTo(newValue?) {

    if (newValue && newValue.target.value as number) {
      this.fromValue = (newValue.target.value as number > 1) ? newValue.target.value.replace(/^0+/, '') as number : newValue.target.value as number;
    } else if (newValue && newValue.target.value === '') {
      this.fromValue = 0;
    }

    this.toValue = Converter[this.selected](this.fromValue).from(this.fromUnit).to(this.toUnit).value;
  }

  ngOnInit(): void {
    this.functions = Object.keys(Converter);

    console.log(Converter[this.functions[1]]().list());
  }
}
