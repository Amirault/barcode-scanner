import { fireEvent, render, screen } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import {EAN13Barcode, parseToEAN13BarCode} from '../core/scan/code.entity';
import { ScanManuallyComponent } from './scan-manually/scan-manually.component';
import { ScanUseCases } from '../core/scan/scan.use-cases';
import { CodeSource } from '../core/scan/code.source';
import { fakeAsync } from '@angular/core/testing';
import { CodeInMemorySource } from '../core/scan/adapters/code-in-memory.source';
import {ScannedCodesComponent} from "./scanned-codes.component";

function scanPageOptions(
  {
    codes = [],
  }: {
    codes?: EAN13Barcode[];
  } = { codes: [] }
) {
  return {
    imports: [ReactiveFormsModule],
    declarations: [ScanManuallyComponent],
    providers: [
      ScanUseCases,
      {
        provide: CodeSource,
        useValue: new CodeInMemorySource(codes),
      }
    ],
  };
}

describe('ScanPageComponent', () => {
  const codeA = parseToEAN13BarCode('3270190207924');
  const codeB = parseToEAN13BarCode('3257971309114');

  describe('scanned product display', () => {
    it('should display nothing when not having codes', fakeAsync(async () => {
      // GIVEN
      await render(ScannedCodesComponent, scanPageOptions({ codes: [] }));
      await expect(screen.queryByText(codeA.toString())).toBeNull();
    }));

    it('should have name, code and price', fakeAsync(async () => {
      // GIVEN
      await render(
        ScannedCodesComponent,
        scanPageOptions({ codes: [codeA] })
      );
      // THEN
      await expect(screen.queryByText(codeA.toString())).not.toBeNull();
    }));

    it('should display all the scanned code', fakeAsync(async () => {
      // GIVEN
      await render(
        ScannedCodesComponent,
        scanPageOptions({ codes: [codeA, codeB] })
      );
      // THEN
      await expect(screen.queryByText(codeA.toString())).not.toBeNull();
      await expect(screen.queryByText(codeB.toString())).not.toBeNull();
    }));
  });

  describe('scanned code actions', () => {
    it('should be possible to remove a scanned code', fakeAsync(async () => {
      // GIVEN
      await render(
        ScannedCodesComponent,
        scanPageOptions({ codes: [codeA, codeB] })
      );
      // WHEN
      fireEvent.click(
        screen.getByTestId(`remove-action-${codeA.toString()}`)
      );
      // THEN
      await expect(screen.queryByText(codeA.toString())).toBeNull();
      await expect(screen.queryByText(codeB.toString())).not.toBeNull();
    }));
  });
});
