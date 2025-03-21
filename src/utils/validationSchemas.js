import * as Yup from 'yup';

export const languageValidationSchema = Yup.object().shape({
  languages: Yup.array()
    .of(Yup.string().required("Language is required"))
    .min(1, "At least one language is required"),
})

export const categoryValidationSchema = Yup.object().shape({
  categories: Yup.array()
    .of(
      Yup.object().shape({
        category: Yup.string().required("Category is required"),
        subcategories: Yup.array()
          .of(Yup.string().required("Subcategory is required"))
          .min(1, "At least one subcategory is required"),
      })
    )
    .min(1, "At least one category is required"),
});

export const CommissionSchema = Yup.object().shape({
  commissionType: Yup.string().required("Commission method is required"),
  monthly: Yup.number()
    .when("commissionType", {
      is: "monthly",
      then: (schema) => schema.required("Monthly charge is required").min(0, "Must be >= 0"),
      otherwise: (schema) => schema.notRequired(),
    }),
  yearly: Yup.number()
    .when("commissionType", {
      is: "yearly",
      then: (schema) => schema.required("Yearly charge is required").min(0, "Must be >= 0"),
      otherwise: (schema) => schema.notRequired(),
    }),
  perclass: Yup.number()
    .when("commissionType", {
      is: "perclass",
      then: (schema) => schema.required("Per class charge is required").min(0, "Must be >= 0"),
      otherwise: (schema) => schema.notRequired(),
    }),
  commissionRemark: Yup.string().required("Remark is required"),
});


export const CouponValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Coupon code is required")
    .min(4, "Coupon code must be at least 4 characters")
    .max(20, "Coupon code cannot exceed 10 characters")
    .matches(/^[A-Z0-9]+$/, "Coupon code must be uppercase letters and numbers only"),

  expirationDate: Yup.date()
    .required("Expiration date is required")
    .min(new Date(), "Expiration date must be in the future"),

  use: Yup.string()
    .required("Usage type is required"),

  role: Yup.string()
    .required("Role is required"),

  discount: Yup.number()
    .required("Discount is required")
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
})

