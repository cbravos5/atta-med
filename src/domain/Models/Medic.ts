export type Specialty = 'Ortopedia' | 'Cardiologia' | 'Neurologia' | 'Dermatologia' | 'Infectologia' | 'Pediatria';

export interface Medic {
  id: string;
  name: string;
  crm: string;
  specialty: Specialty;
}