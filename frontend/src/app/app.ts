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
  editingId = signal<number | null>(null);
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

  save(id: number, name: string, vehicle: string, date: string) {
    this.service.updateReservations(id, { name, vehicle, date }).subscribe({
      next: updated => {
        this.reservations.update(list => list.map(r => r.id === updated.id ? updated : r));
        this.editingId.set(null);
        this.errorMessage.set('');
      },
      error: err => { this.errorMessage.set(err.error?.error || "Could not reach the server") }
    })
  }
}
