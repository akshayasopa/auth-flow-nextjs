"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function useSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    signup(name, email, password)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        setErrors({ form: err.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return {
    name, setName, email, setEmail, password, setPassword,
    confirmPassword, setConfirmPassword, errors, submitting, handleSubmit,
  };
}