import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { LOCATIONS } from "@/data/mockData";
import { Seat } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { addDays, differenceInDays, format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [selectedLocation] = useState(
    LOCATIONS.find((loc) => loc.id === user?.location) || LOCATIONS[0]
  );
  const [selectedFloor, setSelectedFloor] = useState(selectedLocation.floors[0]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [bookedSeat, setBookedSeat] = useState<Seat | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: undefined,
  });
  const [swapRequestSeat, setSwapRequestSeat] = useState<Seat | null>(null);
  const [lastAttendance, setLastAttendance] = useState<Date | null>(null);
  const [attendanceStreak, setAttendanceStreak] = useState(0);

  useEffect(() => {
    // Check if attendance hasn't been marked for 2 days
    if (lastAttendance && bookedSeat) {
      const daysSinceLastAttendance = differenceInDays(new Date(), lastAttendance);
      if (daysSinceLastAttendance >= 2) {
        handleCancelBooking();
        toast({
          variant: "destructive",
          title: "Booking Cancelled",
          description: "Your booking was cancelled due to absence for 2 days",
        });
      }
    }
  }, [lastAttendance, bookedSeat]);

  const handleSeatSelect = (seat: Seat) => {
    if (seat.status === "occupied" && seat.id !== bookedSeat?.id) {
      setSwapRequestSeat(seat);
      return;
    }
    setSelectedSeat(seat);
    toast({
      title: "Seat Selected",
      description: `You've selected seat ${seat.number}`,
    });
  };

  const handleBooking = () => {
    if (!selectedSeat || !dateRange.to) return;

    const daysDiff = differenceInDays(dateRange.to, dateRange.from);
    if (daysDiff > 7) {
      toast({
        variant: "destructive",
        title: "Invalid Date Range",
        description: "Booking period cannot exceed 7 days",
      });
      return;
    }

    setBookedSeat(selectedSeat);
    toast({
      title: "Booking Confirmed",
      description: `You've booked seat ${selectedSeat.number} from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()}`,
    });
  };

  const handleCancelBooking = () => {
    if (!bookedSeat) return;

    setBookedSeat(null);
    setSelectedSeat(null);
    toast({
      title: "Booking Cancelled",
      description: "Your seat booking has been cancelled successfully",
    });
  };

  const handleSwapRequest = (targetSeat: Seat) => {
    if (!bookedSeat) {
      toast({
        variant: "destructive",
        title: "No Active Booking",
        description: "You need an active booking to request a seat swap",
      });
      return;
    }

    setSwapRequestSeat(targetSeat);
    toast({
      title: "Swap Request Sent",
      description: `Your request to swap seat ${bookedSeat.number} with seat ${targetSeat.number} has been sent to admin`,
    });
  };

  const handleMarkAttendance = () => {
    const today = new Date();
    setLastAttendance(today);
    setAttendanceStreak(prev => prev + 1);
    toast({
      title: "Attendance Marked",
      description: `Attendance marked for ${format(today, 'PP')}`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button onClick={handleMarkAttendance}>Mark Attendance</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Date Selection</CardTitle>
            <CardDescription>Select booking dates (max 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range: any) => {
                if (
                  range?.from &&
                  range?.to &&
                  differenceInDays(range.to, range.from) > 7
                ) {
                  range.to = addDays(range.from, 7);
                }
                setDateRange(range || { from: new Date(), to: undefined });
              }}
              numberOfMonths={2}
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Floor Plan - {selectedLocation.name}</CardTitle>
            <CardDescription>
              {bookedSeat 
                ? `Your current booking: Seat ${bookedSeat.number}`
                : "Click on a seat to select it for booking"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedFloor.id}
              onValueChange={(value) => {
                const floor = selectedLocation.floors.find(f => f.id === value);
                if (floor) setSelectedFloor(floor);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select floor" />
              </SelectTrigger>
              <SelectContent>
                {selectedLocation.floors.map((floor) => (
                  <SelectItem key={floor.id} value={floor.id}>
                    {floor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-5 gap-2 mt-4">
              {selectedFloor.seats.map((seat) => (
                <Dialog key={seat.id}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => handleSeatSelect(seat)}
                      className={`p-2 rounded-md text-center transition-all ${
                        seat.id === bookedSeat?.id
                          ? "bg-success text-success-foreground"
                          : seat.status === "occupied"
                          ? "bg-destructive text-destructive-foreground"
                          : seat.id === selectedSeat?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {seat.number}
                    </button>
                  </DialogTrigger>
                  {seat.status === "occupied" && seat.id !== bookedSeat?.id && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Seat Swap</DialogTitle>
                        <DialogDescription>
                          Would you like to request a swap with seat {seat.number}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setSwapRequestSeat(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => handleSwapRequest(seat)}>
                          Request Swap
                        </Button>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))}
            </div>

            <div className="space-y-4 mt-4">
              {!bookedSeat && selectedSeat && dateRange.to && (
                <Button className="w-full" onClick={handleBooking}>
                  Book Seat {selectedSeat.number}
                </Button>
              )}
              {bookedSeat && (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Status</CardTitle>
            <CardDescription>Your attendance streak: {attendanceStreak} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {lastAttendance ? (
                <p>Last attendance marked: {format(lastAttendance, 'PP')}</p>
              ) : (
                <p>No attendance marked yet today</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;