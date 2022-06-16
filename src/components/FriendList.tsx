import * as React from "react";
import "../styles.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Typography, { TypographyClasses } from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  SxProps,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import { CommonProps } from "@mui/material/OverridableComponent";
import { SystemProps } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

function Copyright(
  props: JSX.IntrinsicAttributes & {
    component: React.ElementType<any>;
  } & SystemProps<Theme> & {
      align?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
      children?: React.ReactNode;
      classes?: Partial<TypographyClasses> | undefined;
      gutterBottom?: boolean | undefined;
      noWrap?: boolean | undefined;
      paragraph?: boolean | undefined;
      sx?: SxProps<Theme> | undefined;
      variant?:
        | "button"
        | "caption"
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "inherit"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | "overline"
        | undefined;
      variantMapping?:
        | Partial<
            Record<
              | "button"
              | "caption"
              | "h1"
              | "h2"
              | "h3"
              | "h4"
              | "h5"
              | "h6"
              | "inherit"
              | "subtitle1"
              | "subtitle2"
              | "body1"
              | "body2"
              | "overline",
              string
            >
          >
        | undefined;
    } & CommonProps &
    Omit<
      any,
      | keyof CommonProps
      | (
          | "border"
          | "borderTop"
          | "borderRight"
          | "borderBottom"
          | "borderLeft"
          | "borderColor"
          | "borderRadius"
          | "display"
          | "displayPrint"
          | "overflow"
          | "textOverflow"
          | "visibility"
          | "whiteSpace"
          | "flexBasis"
          | "flexDirection"
          | "flexWrap"
          | "justifyContent"
          | "alignItems"
          | "alignContent"
          | "order"
          | "flex"
          | "flexGrow"
          | "flexShrink"
          | "alignSelf"
          | "justifyItems"
          | "justifySelf"
          | "gap"
          | "columnGap"
          | "rowGap"
          | "gridColumn"
          | "gridRow"
          | "gridAutoFlow"
          | "gridAutoColumns"
          | "gridAutoRows"
          | "gridTemplateColumns"
          | "gridTemplateRows"
          | "gridTemplateAreas"
          | "gridArea"
          | "bgcolor"
          | "color"
          | "zIndex"
          | "position"
          | "top"
          | "right"
          | "bottom"
          | "left"
          | "boxShadow"
          | "width"
          | "maxWidth"
          | "minWidth"
          | "height"
          | "maxHeight"
          | "minHeight"
          | "boxSizing"
          | "m"
          | "mt"
          | "mr"
          | "mb"
          | "ml"
          | "mx"
          | "my"
          | "p"
          | "pt"
          | "pr"
          | "pb"
          | "pl"
          | "px"
          | "py"
          | "margin"
          | "marginTop"
          | "marginRight"
          | "marginBottom"
          | "marginLeft"
          | "marginX"
          | "marginY"
          | "padding"
          | "paddingTop"
          | "paddingRight"
          | "paddingBottom"
          | "paddingLeft"
          | "paddingX"
          | "paddingY"
          | "typography"
          | "fontFamily"
          | "fontSize"
          | "fontStyle"
          | "fontWeight"
          | "letterSpacing"
          | "lineHeight"
          | "textAlign"
          | "textTransform"
        )
      | "children"
      | "sx"
      | "align"
      | "variant"
      | "gutterBottom"
      | "noWrap"
      | "paragraph"
      | "variantMapping"
    >
) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Main Page
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function FriendList() {
  // let navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [userName, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const handleSubmit = (event: {
  //   preventDefault: () => void;
  //   currentTarget: HTMLFormElement | undefined;
  // }) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   let signupDetails = {
  //     userName: userName,
  //     email: email,
  //     password: password,
  //   };
  //   axios
  //     .post("http://localhost:3004/signup", signupDetails)
  //     .then((res) => {
  //       let path = "/signin";
  //       console.log("succesful signup");
  //       console.log("data", res.data);
  //       const { id, email } = res.data;
  //       navigate(path);
  //     })
  //     .catch((error) => {
  //       console.log("signup failed");
  //       console.log("error", error);
  //     });
  //   console.log({
  //     userName: data.get("userName"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PeopleAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Friends
          </Typography>
          <Box
            // component="form"
            // noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 4 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<PeopleAltIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Friend Request</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Placeholder</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<PersonAddIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Add A Friend</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Placeholder</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<MarkEmailReadIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Invite A Friend</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Placeholder</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>All Friends</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Placeholder</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          <Copyright sx={{ mt: 8, mb: 4 }} component={"symbol"} />
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
