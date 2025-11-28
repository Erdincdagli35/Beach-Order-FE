import { Component } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { OrdersService } from '../../services/order.service';
import { OrderByRoomResponse } from '../../models/order/order-by-room-response';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {

  roomResponseByOrder: OrderByRoomResponse[] = [];
    errorMessage = '';

    constructor(
      private os: OrdersService,
      private router: Router,
      public token: TokenService
    ) {}

    ngOnInit(): void {
      this.loadRoom();
    }

    loadRoom(): void {
      this.errorMessage = '';
      this.os.listByRoomNo().subscribe({
        next: (p) => {
          this.roomResponseByOrder = p || [];
        },
        error: (err) => {
          console.error('Room list error', err);
          this.errorMessage = err?.error?.message || err.message || 'Liste yüklenirken hata oluştu.';
        }
      });
    }

}
