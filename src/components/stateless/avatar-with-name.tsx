import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import config from "../../services/config";

import React from "react";

function AvatarWithName({
  profilePicture,
  fullname,
  currentLoginUser,
}: {
  profilePicture?: string;
  fullname?: string;
  currentLoginUser?: boolean;
}) {
  // const { data: session } = useSession();

  function getProfilePicture() {
    // if (currentLoginUser) {
    //   const profilePictureUrl = session?.user.profilePicture.startsWith("http")
    //     ? session.user.profilePicture
    //     : config.storage_url +
    //       "/profile-picture/" +
    //       session?.user.profilePicture;

    //   return profilePictureUrl;
    // }
    return config.storage_url + "/profile-picture/" + profilePicture;
  }

  function getFullName(getIntials?: boolean) {
    if (currentLoginUser) {
      // return session?.user ? session.user.fullname : fullname;
      return fullname;
    }
    if (getIntials) {
      const intials = fullname
        ?.split(" ")
        .map((word) => word[0])
        .join("");

      return intials;
    }
    return fullname;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Avatar>
        <AvatarImage src={getProfilePicture()} />
        <AvatarFallback>{getFullName(true)}</AvatarFallback>
      </Avatar>
      <p className="text-base">{getFullName()}</p>
    </div>
  );
}

export default AvatarWithName;
