import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as envProd } from '../../../enviroments/enviroment.prod';
import { environment } from 'src/enviroments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({ providedIn: 'root' })
export class RoomService {
  base = envProd.roomUrl ;
  //base = environment.productUrl;
  constructor(private http: HttpClient) {}

  list(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.base}/rooms/list/all`);
  }
}
