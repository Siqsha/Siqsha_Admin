import * as Yup from 'yup';

export const languageValidationSchema = Yup.object().shape({
    languages: Yup.array()
        .of(Yup.string().required("Language is required"))
        .min(1, "At least one language is required"),
})

export const categoryValidationSchema = Yup.array().of(
    Yup.object().shape({
        category: Yup.string().required("Category is required"),
        subcategories: Yup.array().of(
            Yup.string().required("Subcategory is required")
        ),
    })
);
