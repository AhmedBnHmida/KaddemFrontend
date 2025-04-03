import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiprojService {

  constructor(private http : HttpClient) { }

  postProject(data : any) {

    return this.http.post<any>("http://192.168.33.10:8089/kaddem/contrat/add-contrat/", data);
  }

  getProject() {


    return this.http.get<any>("http://192.168.33.10:8089/kaddem/contrat/retrieve-all-contrats/");
  }

  

  putProject(data: any ) {
   return this.http.put<any>("http://192.168.33.10:8089/kaddem/contrat/update-contrat/",data);
  }


  deleteProject(idProject : number) {

    return this.http.delete<any>('http://192.168.33.10:8089/kaddem/contrat/remove-contrat/'+idProject);
  }

}
