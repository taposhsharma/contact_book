import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {



  private contacts$: Observable<any[]>;
  contacts: any;
  private contact$: Observable<any[]>;
  contact: any;
  private baseUrl = 'http://localhost:3000/contact/allcontact';

  constructor(private http: HttpClient) {}

  fetchContact(): Observable<any[]> {
    this.contacts$ = this.http.get<any[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error sending get request', error);
        throw error;
      }),
      tap((data) => {
        this.contacts$ = of(data);
      })
    );

    return this.contacts$;
  }

  getStoredcontacts(): Observable<any[]> {
    if (this.contacts$) {
      return this.contacts$;
    } else {
      return this.fetchContact();
    }
  }

  fetchcontactById(id: any): Observable<any[]> {
    console.log(id);
    const contactUrl = 'http://localhost:3000/contact/' + id;
    console.log(contactUrl);

    this.contact$ = this.http.get<any[]>(contactUrl).pipe(
      catchError((error) => {
        console.error('Error sending get request', error);
        throw error;
      }),
      tap((data) => {
        this.contact$ = of(data);
      })
    );

    return this.contact$;
  }

  fetchcontact(id: any): Observable<any | null> {
    if (this.contacts$) {
      this.contacts$.subscribe((data) => {
        this.contacts = data;
        console.log(this.contacts);
      });

      const mycontact = this.contacts.find((contact) => contact._id == id);
      return of(mycontact || null);
    } else {
      return this.fetchcontactById(id);

      // return of( null);
    }

    // return this.getStoredcontacts().pipe(
    //   switchMap((contacts) => {
    //     const mycontact = contacts.find(contact => contact._id == id);
    //     return of(mycontact || null);
    //   })
    // );
  }

  getcontact(id: any): Observable<any | null> {
    return this.fetchcontact(id);
  }

  clear(){
    this.contacts$=null
    this.contacts=null
    this.contact$=null
    this.contact=null
  }
}
