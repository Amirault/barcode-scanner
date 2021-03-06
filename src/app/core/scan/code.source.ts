import { EAN13Barcode } from './code.entity';
import { Observable } from 'rxjs';

export abstract class CodeSource {
  abstract save(code: EAN13Barcode): Observable<void>;

  abstract all(): Observable<EAN13Barcode[]>;

  abstract delete(code: EAN13Barcode): Observable<void>;
}
