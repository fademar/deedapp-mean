import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class DownloadService {

  constructor(private sanitizer: DomSanitizer) { }

  generateDownloadUri(deed) {
    let json = JSON.stringify(deed);
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
    return uri;
  }











}
