class Shoot {
  constructor(
    id,
    clientName,
    date,
    location,
    price,
    status, // "upcoming" or "completed"
    notes // string
  ) {
    this.id = id;
    this.clientName = clientName;
    this.date = date; // Date or string
    this.location = location;
    this.price = price;
    this.status = status;
    this.notes = notes;
  }
}

export default Shoot;