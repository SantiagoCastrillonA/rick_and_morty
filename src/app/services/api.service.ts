import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character, ApiResponse } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<Character[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.results)
    );
  }
}
