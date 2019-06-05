import React from "react";
import Api, { ConnectionState } from "containers/Api";
import { IconButton } from "@material-ui/core";

import FullscreenIcon from "@material-ui/icons/Fullscreen";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const actions = [
  {
    name: "SCREENSHOT",
    action: () => ({ type: "SCREENSHOT" }),
    icon: <FullscreenIcon />
  },
  {
    name: "WEBCAM_SNAP",
    action: () => ({ type: "WEBCAM_SNAP" }),
    icon: <PhotoCameraIcon />
  }
];

export default function TopActions() {
  const api = Api.use();

  const supported = (action: any): boolean =>
    api.target.features.indexOf(action.name) > -1;

  if (api.connectionState !== ConnectionState.TargetConnected) {
    return <div />;
  }

  const onClick = (action: any) => {
    api.send(action.action());
  };

  console.log(api.target);

  return (
    <div style={{ display: "flex" }} className="text-darker">
      {actions.filter(supported).map(a => (
        <IconButton
          color="inherit"
          size="small"
          onClick={() => onClick(a)}
          key={a.name}
        >
          {a.icon}
        </IconButton>
      ))}
    </div>
  );
}