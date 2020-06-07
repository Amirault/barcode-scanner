import {Injectable} from '@angular/core';
import {CodeSource} from './code.source';
import {EAN13Barcode, parseToEAN13BarCode} from './code.entity';
import {forkJoin, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable()
export class ScanUseCases {
  constructor(
    private readonly codeSource: CodeSource
  ) {}

  saveCode(code: string): Observable<void> {
    const EAN13BarCode = parseToEAN13BarCode(code);
    if (EAN13BarCode) {
      return this.codeSource.save(EAN13BarCode);
    } else {
      alert('Invalid ean 13 barcode !');
    }
  }

  scannedCodes(): Observable<EAN13Barcode[]> {
    return this.codeSource.all();
  }

  removeCode(code: EAN13Barcode): Observable<void> {
    return this.codeSource.delete(code);
  }
}
