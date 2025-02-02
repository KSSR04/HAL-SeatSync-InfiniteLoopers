import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS, SWAP_REQUESTS, ANALYTICS } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);

  const handleSwapRequest = (requestId: string, action: "approve" | "reject") => {
    toast({
      title: `Request ${action}ed`,
      description: `Swap request has been ${action}ed successfully`,
    });
  };

  // Mock data for analytics graphs
  const weeklyData = [
    { name: "Mon", water: 120, electricity: 240 },
    { name: "Tue", water: 150, electricity: 220 },
    { name: "Wed", water: 180, electricity: 260 },
    { name: "Thu", water: 140, electricity: 230 },
    { name: "Fri", water: 160, electricity: 250 },
  ];

  const occupancyData = [
    { name: "Chennai", rate: 85 },
    { name: "Mumbai", rate: 75 },
    { name: "Pune", rate: 90 },
    { name: "Kochi", rate: 70 },
    { name: "Bangalore", rate: 95 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Consumption</CardTitle>
            <CardDescription>Weekly water and electricity usage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="water" 
                  stroke="#2563eb" 
                  name="Water (L)"
                />
                <Line 
                  type="monotone" 
                  dataKey="electricity" 
                  stroke="#dc2626" 
                  name="Electricity (kWh)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Office Occupancy Rates</CardTitle>
            <CardDescription>Current occupancy by location</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="rate" 
                  fill="#3b82f6" 
                  name="Occupancy Rate (%)" 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Location Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Select
              onValueChange={(value) =>
                setSelectedLocation(
                  LOCATIONS.find((loc) => loc.id === value) || LOCATIONS[0]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-4">
              {selectedLocation.floors.map((floor) => (
                <div key={floor.id} className="space-y-2">
                  <h3 className="font-semibold">{floor.name}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {floor.seats.map((seat) => (
                      <div
                        key={seat.id}
                        className={`p-2 rounded-md text-center ${
                          seat.status === "occupied"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-secondary"
                        }`}
                      >
                        {seat.number}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Swap Requests</CardTitle>
          <CardDescription>Manage seat swap requests from employees</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {SWAP_REQUESTS.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{request.requesterName}</div>
                      <div className="text-sm text-muted-foreground">
                        Requesting swap from seat {request.currentSeatId} to{" "}
                        {request.requestedSeatId}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleSwapRequest(request.id, "approve")}
                        className="bg-success hover:bg-success/90"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleSwapRequest(request.id, "reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
