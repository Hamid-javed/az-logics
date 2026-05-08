"use client";

import { createBlogFeedback, Feedback } from "@/app/api/blog";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "../Button";

const FeedbackForm = ({ blogId }: { blogId: number }) => {
  const [formData, setFormData] = useState<Partial<Feedback>>({
    name: "",
    email: "",
    website: "",
    comment: "",
    blog: blogId || 0,
  });

  const [errors, setErrors] = useState<Partial<Feedback>>({});
  const [submitMessage, setSubmitMessage] = useState("");

  const { mutate: handleCreateFeedback, isPending: isSubmitting } = useMutation(
    {
      mutationFn: async (data: Partial<Feedback>) =>
        await createBlogFeedback(data),
      onSuccess: async () => {
        setSubmitMessage("Feedback submitted successfully!");
        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          website: "",
          comment: "",
        }));
      },
      onError: (error) => {
        console.error("Error submitting feedback:", error);
        setSubmitMessage("Failed to submit feedback. Please try again.");
      },
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof Feedback]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Feedback> = {};
    if (!formData?.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData?.comment?.trim()) {
      newErrors.comment = "Comment is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage("");

    if (validateForm()) {
      handleCreateFeedback(formData);
    }
  };

  const inputClass =
    "w-full dark:bg-dark-surface-primary bg-dark-neutrals-default rounded-lg md:p-3 p-2 outline-none border";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          id="website"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          placeholder="Comment"
          onChange={handleChange}
          rows={5}
          className={`${inputClass} ${errors.comment ? "border-red-500" : ""}`}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
        )}
      </div>

      {submitMessage && (
        <p
          className={`mt-4 ${
            submitMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {submitMessage}
        </p>
      )}

      <Button
        disabled={isSubmitting}
        text={isSubmitting ? "Submitting..." : "Submit Comment"}
        type="submit"
        className="block mx-auto px-10!"
      />
    </form>
  );
};

export default FeedbackForm;
