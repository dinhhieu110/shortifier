import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import type { IUser } from "@/types";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const initForm = {
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  };
  const [form, setForm] = useState<IUser>(initForm);
  const [errors, setErrors] = useState<Partial<Record<keyof IUser, string>>>(
    {}
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignup } = useFetch(signUp, form);
  const { fetchCurrentUser } = UrlState();
  useEffect(() => {
    if (!error && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchCurrentUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(form, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const newErrors: Partial<Record<keyof IUser, string>> = {};

        e.inner.forEach((err) => {
          if (err.path && err.message) {
            newErrors[err.path as keyof IUser] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        // Optional: handle other error types
        console.error("Unexpected error during validation:", e);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t yet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="name"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message="Name is invalid" />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message="Email is invalid" />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message="Password is invalid" />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message="Profile picture is invalid" />}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="h-full bg-[#0186da] hover:bg-[#0186da] cursor-pointer"
          onClick={handleSignup}
        >
          {loading ? <BeatLoader size={10} color="#fff" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
