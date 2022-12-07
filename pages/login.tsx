import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

type FormProps = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [values, setValues] = useState<FormProps>();
  const onSubmit = (data: FormProps) => {
    setValues(data);
  };

  useEffect(() => {
    if (values?.username == "admin") {
      if (values.password == "Admin123!") {
        setCookie(null, "token", "gundulgileeeeee", {
          maxAge: 1 * 24 * 60 * 60, // 24 hours
          path: "/",
        });
        router.push("/");
      }
    }
  }, [values]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <FormContainer onSuccess={onSubmit}>
          <Stack direction={"column"}>
            <TextFieldElement
              color={"primary"}
              name={"username"}
              label={"Username"}
              type={"text"}
            />
            <br />
            <TextFieldElement
              color={"secondary"}
              name={"password"}
              label={"Password"}
              type={"password"}
            />
            <br />
            <Button type={"submit"} variant={"contained"} color={"primary"}>
              Submit
            </Button>
          </Stack>
        </FormContainer>
        <div>
          Data:
          <br />
          {JSON.stringify(values)}
        </div>
      </Box>
    </Container>
  );
}
