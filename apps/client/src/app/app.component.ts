import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@quantalys/client/ui-components/header';
import { VersionService } from './service/version.service';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  selector: 'quantalys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private versionService: VersionService) { }

  async ngOnInit() {
    const version = await this.versionService.getVersion();
    console.log(`App version: ${version}`);
  }
}
