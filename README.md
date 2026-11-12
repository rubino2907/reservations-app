# Reservations App

A small vehicle reservation app with a Flask REST API and an Angular frontend.

Each reservation has an `id`, a `name`, a `vehicle` and a `date`.

## How to run the backend

Requirements: Python 3.

```bash
cd backend
python3 -m venv .venv              # only the first time
source .venv/bin/activate
pip install -r requirements.txt
flask --app app run --debug
```

The API runs at http://127.0.0.1:5000.

Data is kept in memory, so it resets when the server restarts.

### API endpoints

| Method | URL                      | Description              |
|--------|--------------------------|--------------------------|
| GET    | `/reservations`          | List all reservations    |
| POST   | `/reservations`          | Create a reservation     |
| PUT    | `/reservations/<id>`     | Update a reservation     |
| DELETE | `/reservations/<id>`     | Delete a reservation     |

`POST` and `PUT` require `name`, `vehicle` and `date`, and return `400` if one is missing.
`PUT` and `DELETE` return `404` if the id does not exist.

Example request body for `POST` and `PUT`:

```json
{ "name": "Ana", "vehicle": "BMW", "date": "2026-12-01" }
```

### Backend tests

With the virtual environment active:

```bash
cd backend
pytest
```

## How to run the frontend

Requirements: Node.js and npm. The backend must be running first.

```bash
cd frontend
npm install                        # only the first time
npm start
```

The app runs at http://localhost:4200.

You can list, add, edit and delete reservations from the page.
