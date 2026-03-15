import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function UserAvatar({size = 8}: {size?: number}) {
    const {user} = useAuth()
  return (
    <Avatar className={`size-${size} rounded-lg`}>
      <AvatarImage
        src={user.image || "USER_IMAGE"}
        alt="user image"
      />
      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground cursor-default">
        {user.firstName?.charAt(0) + user.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
