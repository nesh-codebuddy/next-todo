import { Input, Button, Text, em } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "@/components/Container/Container";
import useStore from "@/store/store";
import { useRouter } from "next/router";

const userFormSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(userFormSchema),
  });

  const { username, email, updateUserdata } = useStore((store) => store);
  const router = useRouter();
  const { query } = router;
  console.log("query", query);

  const onSubmit: SubmitHandler<UserType> = (userData) => {
    console.log("userData", userData);
    updateUserdata(userData);
    router.back();
  };

  useEffect(() => {
    if (query.edit === "true") {
      setValue("username", username);
      setValue("email", email);
    }
  }, [query]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Input
          placeholder="Enter your UserName"
          variant="filled"
          size="sm"
          className="w-full md:w-1/2 lg:w-1/3"
          autoFocus={true}
          {...register("username", { required: true })}
        />
        <Input
          placeholder="Enter your Email"
          variant="filled"
          size="sm"
          className="w-full md:w-1/2 lg:w-1/3 !mt-4"
          {...register("email", { required: true })}
        />

        {errors.username && <Text c="red">{errors.username.message}</Text>}
        {errors.email && <Text c="red">{errors.email.message}</Text>}

        <Button variant="filled" color="gray" type="submit" className="mt-4">
          {query.edit === "true" ? "Update" : "Login"}
        </Button>
      </Container>
    </form>
  );
};

export default Login;
