export interface Department {
  idDepartement?: number;
  nomDepartement: string;
  capacity: number;
  active: boolean;
  etudiants?: Etudiant[];
  professors?: Professor[];
}

export interface DepartmentInput {
  nomDepartement: string;
  capacity: number;
  active: boolean;
}

export interface Etudiant {
  idEtudiant?: number;
  prenomE: string;
  nomE: string;
  op: string;
  contrats?: any[];
  departement?: any;
  equipes?: any[];
}

export interface Professor {
  id: number;
  name: string;
  experienceYears: number;
  specialty: string;
}

export interface DepartmentStatistics {
  studentCount: number;
  professorCount: number;
  courseCount: number;
  averageGrade: number;
  utilizationRate: number;
  maleToFemaleRatio: number;
  [key: string]: any;
} 