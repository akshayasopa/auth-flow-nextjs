"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    login(email, password)
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

  return { email, setEmail, password, setPassword, errors, submitting, handleSubmit };
}