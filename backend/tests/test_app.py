import pytest
from app import app, reservations

@pytest.fixture
def client():
    reservations.clear()
    reservations.append({"id": 1, "name": "Ruben", "vehicle": "Audi", "date": "2026-11-20"})
    return app.test_client()

def test_get_reservations(client):
    response = client.get("/reservations")
    assert response.status_code == 200
    assert len(response.get_json()) == 1

def test_post_missing_field_returns_400(client):
    response = client.post("/reservations", json={"vehicle": "BMW", "date": "2026-12-01"})
    assert response.status_code == 400
    assert len(reservations) == 1
    
def test_delete_unknown_id_returns_404(client):
    response = client.delete("/reservations/999")
    assert response.status_code == 404