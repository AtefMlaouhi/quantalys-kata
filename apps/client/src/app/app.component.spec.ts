import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from '@quantalys/client/ui-components/header';
import { AppComponent } from './app.component';
import { VersionService } from './service/version.service';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent],
      providers: [VersionService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getVersion method on ngOnInit', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const versionService = TestBed.inject(VersionService);
    const getVersionSpy = jest.spyOn(versionService, 'getVersion').mockReturnValue(Promise.resolve('1.0.0'));

    await app.ngOnInit();

    expect(getVersionSpy).toHaveBeenCalled();
  });
});
