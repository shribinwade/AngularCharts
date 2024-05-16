import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  

  constructor(private httpClient:HttpClient) { }
   APIURL="https://shribinwade.github.io/api/db.json";
 // APIURL="http://localhost:3000/data";

   getserviceData() {
    return this.httpClient.get(this.APIURL);
  } 

}
