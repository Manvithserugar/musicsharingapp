import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const GreyText = styled("span")({
  color: "grey",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#1976d2", // MUI primary color
  "&:hover": {
    textDecoration: "underline",
  },
});

const SignupForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data) => {
    const success = await onSubmit(data); // Expecting `onSubmit` to return a success status
    if (success) {
      reset(); // Clear fields only if submission is successful
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#9933ff",
          marginBottom: 2,
        }}
      >
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Username is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Username"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm password is required",
            validate: (value) => {
              const { password } = getValues();
              return value === password || "Passwords do not match";
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="password"
              label="Confirm Password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <GreyText>Already an user? </GreyText>
          <StyledLink to="/userauth/login" replace>
            Login
          </StyledLink>
        </Box>
      </Box>
    </>
  );
};

export default SignupForm;
