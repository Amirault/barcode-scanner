import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-scan-in-memory',
  template: `
    <form [formGroup]="scanForm" (ngSubmit)="this.submitCode()">
      <label>
        <input
          data-testid="manual-scan-input"
          type="text"
          formControlName="code"
        />
      </label>
      <button type="submit">+</button>
    </form>
  `,
})
export class ScanInMemoryComponent implements OnInit {
  @Output()
  code = new EventEmitter<string>();
  scanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.scanForm = this.fb.group({
      code: ['3257971309114', Validators.required],
    });
  }

  ngOnInit() {}

  submitCode() {
    const submittedCode = this.scanForm.value.code;
    this.code.emit(submittedCode);
  }
}
