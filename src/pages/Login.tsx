import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOCATIONS } from "@/data/mockData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const { login } = useAuth();

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, location);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fadeIn">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Office Seat Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="employee" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="employee">
              <form onSubmit={handleEmployeeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Select onValueChange={setLocation} required>
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
                </div>
                <Button type="submit" className="w-full">
                  Login as Employee
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Admin
                </Button>
              </form>
            </TabsContent>

            <div className="mt-6 space-y-4">
              <div className="text-sm text-muted-foreground">
                Demo Credentials:
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 border rounded">
                  <div className="font-semibold">Admin</div>
                  <div>Email: admin@demo.com</div>
                  <div>Password: admin123</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-semibold">Employee</div>
                  <div>Email: employee@demo.com</div>
                  <div>Password: employee123</div>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;