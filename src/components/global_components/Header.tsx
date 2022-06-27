import * as React from 'react';
import Avatar from "@mui/material/Avatar";

import "./text.css"; 

export default function Header(){
  return (
    <div className="body">
      <div className="waviy">
        <span style={{ ["--i" as any]: 1 }}>HABIT?</span>
        <span style={{ ["--i" as any]: 2 }}></span>
        <span style={{ ["--i" as any]: 3 }}></span>
        <span style={{ ["--i" as any]: 4 }}></span>
        <span style={{ ["--i" as any]: 5 }}></span>
        <span style={{ ["--i" as any]: 6 }}></span>
        <span style={{ ["--i" as any]: 7 }}></span>
        <span style={{ ["--i" as any]: 8 }}></span>
        <span style={{ ["--i" as any]: 9 }}></span>

        <span style={{ ["--i" as any]: 10 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>T</Avatar>
        </span>
        <span style={{ ["--i" as any]: 11 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>R</Avatar>
        </span>
        <span style={{ ["--i" as any]: 12 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>A</Avatar>
        </span>
        <span style={{ ["--i" as any]: 13 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>C</Avatar>
        </span>
        <span style={{ ["--i" as any]: 14 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>K</Avatar>
        </span>
        <span style={{ ["--i" as any]: 15 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>I</Avatar>
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