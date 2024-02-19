import { Injectable } from '@angular/core';

@Injectable(
  { providedIn: 'root' }
)
export class VersionService {
  async getVersion(): Promise<string> {
    return Promise.resolve('1.0.0');
  }
}
