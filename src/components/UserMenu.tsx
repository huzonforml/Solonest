
import { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserData {
  name: string;
  email: string;
  profession: string;
  avatar: string;
}

export function UserMenu() {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add profession if not exists
      if (!parsedUser.profession) {
        parsedUser.profession = "Business Professional";
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast("You've been logged out successfully.");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="p-4">
        <Button 
          onClick={() => navigate("/")} 
          className="neo-button w-full bg-neo-600 text-neo-100 hover:bg-neo-700"
          variant="outline"
        >
          <User size={16} />
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* User Info Card */}
      <div className="neo-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-neo-300 text-neo-700 text-lg font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-neo-800">{user.name}</span>
            <span className="text-sm text-neo-600">{user.profession}</span>
            <span className="text-xs text-neo-500">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        className="neo-button w-full bg-red-500 text-white hover:bg-red-600 border-red-400"
        variant="outline"
      >
        <LogOut size={16} />
        Log Out
      </Button>
    </div>
  );
}
