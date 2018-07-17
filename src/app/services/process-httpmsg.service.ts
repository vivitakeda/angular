import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { of , Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }
  public extractData (res: Response ) {
    const body = res.json();
    return body || {};
  }
}
