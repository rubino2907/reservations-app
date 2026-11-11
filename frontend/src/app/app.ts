import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReservationService, Reservation } from './reservation';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  private service = inject(ReservationService);
  reservations = signal<Reservation[]>([])
  errorMessage = signal('')
  protected readonly title = signal('frontend');

  ngOnInit() {
    this.service.getReservations().subscribe(data => {
      this.reservations.set(data)
    })
  }

  add(name: string, vehicle: string, date:string){
    this.service.createReservations({name, vehicle, date}).subscribe({
    next: created => { this.reservations.update(list => [...list, created]); this.errorMessage.set('') },
    error: err => { this.errorMessage.set(err.error?.error || "Could not reach the server") }
    })
  }

  remove(id: number){
    this.service.deleteReservations(id).subscribe(() => {
      this.reservations.update(list => list.filter(r => r.id !== id));
    })
  }
}
