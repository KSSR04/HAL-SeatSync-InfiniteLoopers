export interface Location {
  id: string;
  name: string;
  floors: Floor[];
}

export interface Floor {
  id: string;
  name: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: string;
  status: "available" | "occupied" | "selected" | "maintenance";
  occupiedBy?: {
    id: string;
    name: string;
    lastAttendance?: Date;
    attendanceStreak?: number;
  };
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  currentSeatId: string;
  requestedSeatId: string;
  status: "pending" | "approved" | "rejected";
  timestamp: string;
}

export interface Analytics {
  waterConsumption: number;
  electricityConsumption: number;
  occupancyRate: number;
}