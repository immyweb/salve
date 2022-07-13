const headers = {
  "Content-Type": "application/json",
};

export async function getClinics() {
  const res = await fetch(`http://localhost:3000/api/clinics`, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  return data;
}

export async function getPatients(id: string) {
  const res = await fetch(`http://localhost:3000/api/patients/${id}`, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  return data;
}
