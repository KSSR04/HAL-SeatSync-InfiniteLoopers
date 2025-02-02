import { Location, SwapRequest, Analytics } from "@/types";

interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
}

export const DEMO_USERS: Record<string, DemoUser> = {
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
  },
  employee: {
    id: "emp-1",
    name: "John Employee",
    email: "employee@demo.com",
    password: "employee123",
    role: "employee",
  },
};

export const LOCATIONS: Location[] = [
  {
    id: "chennai",
    name: "Chennai",
    floors: [
      {
        id: "chennai-1",
        name: "Floor 1",
        seats: Array.from({ length: 20 }, (_, i) => ({
          id: `chennai-1-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
      {
        id: "chennai-2",
        name: "Floor 2",
        seats: Array.from({ length: 15 }, (_, i) => ({
          id: `chennai-2-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
    ],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    floors: [
      {
        id: "mumbai-1",
        name: "Floor 1",
        seats: Array.from({ length: 25 }, (_, i) => ({
          id: `mumbai-1-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
    ],
  },
  {
    id: "pune",
    name: "Pune",
    floors: [
      {
        id: "pune-1",
        name: "Floor 1",
        seats: Array.from({ length: 18 }, (_, i) => ({
          id: `pune-1-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
    ],
  },
  {
    id: "kochi",
    name: "Kochi",
    floors: [
      {
        id: "kochi-1",
        name: "Floor 1",
        seats: Array.from({ length: 15 }, (_, i) => ({
          id: `kochi-1-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
    ],
  },
  {
    id: "bangalore",
    name: "Bangalore",
    floors: [
      {
        id: "bangalore-1",
        name: "Floor 1",
        seats: Array.from({ length: 30 }, (_, i) => ({
          id: `bangalore-1-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
      {
        id: "bangalore-2",
        name: "Floor 2",
        seats: Array.from({ length: 25 }, (_, i) => ({
          id: `bangalore-2-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.7 ? "occupied" : "available",
        })),
      },
    ],
  },
];

export const SWAP_REQUESTS: SwapRequest[] = [
  {
    id: "swap-1",
    requesterId: "emp-1",
    requesterName: "John Employee",
    currentSeatId: "chennai-1-5",
    requestedSeatId: "chennai-1-10",
    status: "pending",
    timestamp: new Date().toISOString(),
  },
];

export const ANALYTICS: Analytics = {
  waterConsumption: 2500, // Liters
  electricityConsumption: 1200, // kWh
  occupancyRate: 75, // Percentage
};