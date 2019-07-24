import {Component, OnInit} from '@angular/core';
import * as Converter from 'units-converter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public functions: string[] = [];
  public units: any[] = [];
  public fromUnit: string;
  public toUnit: string;
  public selected: string;
  public fromValue: number;
  public toValue: number;

  // Where True is for fromValue and False for toValue
  private lastChanged = true;

  public onSelectionChangeType() {
    this.units = Converter[this.selected]().list();
    this.fromUnit = this.units[0].unit;
    this.toUnit = this.units[1].unit;
    this.fromValue = 1;
    this.toValue = Converter[this.selected](this.fromValue).from(this.fromUnit).to(this.toUnit).value;
  }

  public onSelectionChangeFrom(newValue?) {

    if (newValue && newValue.target.value as number) {

      this.toValue = (newValue.target.value as number > 1) ? newValue.target.value.replace(/^0+/, '') as number : newValue.target.value as number;
    } else if (newValue && newValue.target.value === '') {
      this.toValue = 0;
    }

    this.fromValue = Converter[this.selected](this.toValue).from(this.fromUnit).to(this.toUnit).value;
  }


  public onSelectionChangeTo(newValue?) {

    if (newValue && newValue.target.value as number) {
      this.fromValue = (newValue.target.value as number > 1) ? newValue.target.value.replace(/^0+/, '') as number : newValue.target.value as number;
    } else if (newValue && newValue.target.value === '') {
      this.fromValue = 0;
    }

    this.toValue = Converter[this.selected](this.fromValue).from(this.fromUnit).to(this.toUnit).value;
  }

  ngOnInit(): void {
    this.functions = Object.keys(Converter);
  }
}
