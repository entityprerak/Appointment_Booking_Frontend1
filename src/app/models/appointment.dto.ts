export interface AppointmentDTO {
    id: number;
    doctorId: number;
    slotId: number;
    userId: number;
    userName: string;
    date: string; 
    problem: string;
    appointmentStatus: string;
    doctorName: string;
    start_time: string; 
    end_time: string;
    specialty: string;
  }