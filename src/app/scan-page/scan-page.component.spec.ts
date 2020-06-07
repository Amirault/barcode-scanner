import {ScanPageComponent} from './scan-page.component';
import {fireEvent, render, screen} from '@testing-library/angular';
import {ScanInMemoryComponent} from '../scan/lib/scan-in-memory/scan-in-memory.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ScanComponent} from '../scan/scan.component';
import {EAN13Barcode} from '../core/scan/code.entity';
import {ScanUseCases} from '../core/scan/scan.use-cases';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {CodeSource} from '../core/scan/code.source';
import {CodeInMemorySource} from '../core/scan/adapters/code-in-memory.source';
import {ScannedCodesComponent} from "../scanned-codes/scanned-codes.component";

function EAN13BarcodeFake(code: string = '3270190207924') {
  return (code as unknown) as EAN13Barcode;
}

function scanPageOptions(
  {
    scanMode = 'manual',
  }: {
    codes?: EAN13Barcode[];
    scanMode?: 'manual' | 'basic' | 'accurate';
  } = { codes: [], scanMode: 'manual' }
) {
  return {
    imports: [ReactiveFormsModule],
    declarations: [ScanComponent, ScanInMemoryComponent],
    providers: [
      ScanUseCases,
      {
        provide: CodeSource,
        useValue: new CodeInMemorySource(),
      },
      {
        provide: 'ENV',
        useValue: { scanMode },
      },
    ],
    routes: [
      {
        path: 'scanned-codes',
        component: ScannedCodesComponent,
      },
    ],
  };
}

describe('ScanPageComponent', () => {
  const codeA =EAN13BarcodeFake('3270190207924');

  describe('scanned product actions', () => {
    it('should save the scanned code', fakeAsync(async () => {
      // GIVEN
      const scanPage = await render(
        ScanPageComponent,
        scanPageOptions({ codes: [] })
      );
      const scanUseCases = TestBed.inject(ScanUseCases);
      // WHEN
      await scanPage.type(
        screen.getByTestId('manual-scan-input'),
        codeA.toString()
      );
      fireEvent.click(screen.getByText('+'));
      // THEN
      await scanUseCases
        .scannedCodes()
        .subscribe((codes) => expect(codes.length === 1).toBeTrue());
    }));
  });
});
