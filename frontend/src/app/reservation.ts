import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';

export interface Reservation {
    id:number;
    name: string;
    vehicle: string;
    date: string;
}

@Service()
export class ReservationService {
    private http = inject(HttpClient);

    getReservations() {
        return this.http.get<Reservation[]>('http://127.0.0.1:5000/reservations');
    }
    
    createReservations(body: Omit<Reservation, 'id'>) {
        return this.http.post<Reservation>('http://127.0.0.1:5000/reservations', body)
    }
}
