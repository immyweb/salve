export interface IPatient {
  id: number;
  clinic_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

export interface IClinic {
  id: number;
  name: string;
}
