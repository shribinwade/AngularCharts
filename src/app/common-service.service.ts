import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  

  constructor(private httpClient:HttpClient) { }
  APIURL="http://localhost:3001/data";

   getserviceData() {
    return this.httpClient.get(this.APIURL);
  } 

}
