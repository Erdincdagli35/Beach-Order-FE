import { Component } from '@angular/core';
import { OrdersService } from '../../services/order.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {

  rooms: Room[] = [];
    errorMessage = '';

    constructor(
      private rs: RoomService,
      private router: Router,
      public token: TokenService
    ) {}

    ngOnInit(): void {
      this.loadOrders();
    }

    loadOrders(): void {
      this.errorMessage = '';
      this.rs.list().subscribe({
        next: (p) => {
          this.rooms = p || [];
        },
        error: (err) => {
          console.error('Order list error', err);
          this.errorMessage = err?.error?.message || err.message || 'Liste yüklenirken hata oluştu.';
        }
      });
    }

}
