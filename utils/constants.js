const validationConfig = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 50,
    requiredMessage: "Title is required.",
    minLengthMessage: "Title must be at least 3 characters.",
    maxLengthMessage: "Title cannot exceed 50 characters.",
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 200,
    requiredMessage: "Description is required.",
    minLengthMessage: "Description must be at least 10 characters.",
    maxLengthMessage: "Description cannot exceed 200 characters.",
  },
};
