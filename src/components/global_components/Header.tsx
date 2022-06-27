import * as React from 'react';
import Avatar from "@mui/material/Avatar";

import "./text.css"; 

export default function Header(){
  return (
    <div className="body">
      <div className="waviy">
        

        <span style={{ ["--i" as any]: 10 }}>
          <Avatar sx={{ bgcolor: "#CCCCFF	" }}>T</Avatar>
        </span>
        <span style={{ ["--i" as any]: 11 }}>
          <Avatar sx={{ bgcolor: "#BFB0E7" }}>R</Avatar>
        </span>
        <span style={{ ["--i" as any]: 12 }}>
          <Avatar sx={{ bgcolor: "#B495CD" }}>A</Avatar>
        </span>
        <span style={{ ["--i" as any]: 13 }}>
          <Avatar sx={{ bgcolor: "#A979B1" }}>C</Avatar>
        </span>
        <span style={{ ["--i" as any]: 14 }}>
          <Avatar sx={{ bgcolor: "#9E5E94" }}>K</Avatar>
        </span>
        <span style={{ ["--i" as any]: 15 }}>
          <Avatar sx={{ bgcolor: "#914275" }}>I</Avatar>
        </span>
        <span style={{ ["--i" as any]: 16 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>T</Avatar>
        </span>
        <span style={{ ["--i" as any]: 17 }}></span>
        <span style={{ ["--i" as any]: 18 }}></span>
      </div>
    </div>
  );
}