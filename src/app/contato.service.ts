import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contato/contato';
import { ContatoPaginator } from './contato/contatoPaginator';

@Injectable({ providedIn: 'root' })
export class ContatoService {

  constructor(
    private http: HttpClient
  ) { }

  url: string = "http://localhost:8080/api/contatos";

  salvar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }


  listar(page, size): Observable<ContatoPaginator> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    const urlFinal = this.url + "?" + params.toString();
    return this.http.get<any>(urlFinal);
  }

  favoritar(id: number) {
    return this.http.patch(this.url + "/" + id, null);
  }

  uploadFoto(id: number, formData: FormData): Observable<any> {
    return this.http.put(this.url + '/' + id + '/foto', formData, { responseType: 'blob' });
  }

}
