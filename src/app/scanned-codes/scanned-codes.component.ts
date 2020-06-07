import { Component, OnInit } from '@angular/core';
import { EAN13Barcode } from '../core/scan/code.entity';
import { ScanUseCases } from '../core/scan/scan.use-cases';

@Component({
  selector: 'app-scanned-codes',
  templateUrl: './scanned-codes.component.html',
  styleUrls: ['./scanned-codes.component.scss'],
})
export class ScannedCodesComponent implements OnInit {
  scannedCodes: EAN13Barcode[];

  constructor(public scanUseCases: ScanUseCases) {
    this.scannedCodes = [];
  }

  ngOnInit(): void {
    this.scanUseCases
      .scannedCodes()
      .subscribe((_) => (this.scannedCodes = _));
  }

  onScannedCode(scannedCode: string) {
    this.scanUseCases.saveCode(scannedCode).subscribe();
  }

  onRemoveCode(productCode: EAN13Barcode) {
    this.scanUseCases.removeCode(productCode).subscribe();
  }
}
