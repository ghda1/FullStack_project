import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function UpdateProfile() {
  const locationState = useLocation();
  const [updateProfileData, setUpdateProfileData] = useState(
    locationState.state
  );
  return <div>hi</div>;
}

export default UpdateProfile;
