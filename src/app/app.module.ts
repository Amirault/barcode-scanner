import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {ScanditSdkModule} from 'scandit-sdk-angular';
import {ScanditComponent} from './scan/lib/scandit/scandit.component';
import {ScanComponent} from './scan/scan.component';
import {ScanQuaggaComponent} from './scan/lib/scanquagga/scan-quagga.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ScanInMemoryComponent} from './scan/lib/scan-in-memory/scan-in-memory.component';
import {ScanPageComponent} from './scan-page/scan-page.component';
import {environment} from '../environments/environment';
import {NgxBarcode6Module} from 'ngx-barcode6';
import {HttpClientModule} from '@angular/common/http';
import {ScanUseCases} from './core/scan/scan.use-cases';
import {CodeSource} from './core/scan/code.source';
import {CodeInMemorySource} from './core/scan/adapters/code-in-memory.source';
import {MenuComponent} from './menu/menu.component';
import {ScannedCodesComponent} from "./scanned-codes/scanned-codes.component";
import {ScanManuallyComponent} from './scanned-codes/scan-manually/scan-manually.component';

const routes = [
  { path: 'scanned-codes', component: ScannedCodesComponent },
  { path: '', component: ScannedCodesComponent },
  {
    path: 'scan',
    component: ScanPageComponent,
  },
];

const engineLocation = 'assets/';

@NgModule({
  declarations: [
    AppComponent,
    ScanditComponent,
    ScanPageComponent,
    ScanComponent,
    ScanQuaggaComponent,
    ScanInMemoryComponent,
    ScanPageComponent,
    ScannedCodesComponent,
    ScanManuallyComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ScanditSdkModule.forRoot(environment.scanditKey, engineLocation),
    ReactiveFormsModule,
    NgxBarcode6Module,
    HttpClientModule,
  ],
  providers: [
    { provide: 'ENV', useValue: environment },
    ScanUseCases,
    {
      provide: CodeSource,
      useValue: new CodeInMemorySource([]),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
