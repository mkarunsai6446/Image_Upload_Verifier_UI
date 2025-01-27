import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = 'http://localhost:5000/api/files/verify';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, path: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    return this.http.post<any[]>(this.apiUrl , formData);
  }
}
