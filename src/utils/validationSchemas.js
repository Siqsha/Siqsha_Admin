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
