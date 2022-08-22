import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export const RegisterSchema = yup.object({
	fullname: yup.string().trim().max(45, "Name must be less than 45 characters!").required("Full Name required!"),
	email: yup.string().trim().lowercase().email("Email must be valid!").max(60, "Email must be less than 60 characters!").required("Email required!"),
	password: yup
		.string()
		.trim()
		.required("Password required!")
		.min(8, "Password must contain at least 8 characters!")
		.minLowercase(1, "Password must contain at least 1 lowercase character!")
		.minUppercase(1, "Password must contain at least 1 uppercase character!")
		.minNumbers(1, "Password must contain at least 1 number!")
		.minSymbols(1, "Password must contain at least 1 special character!"),
	acceptTerms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

export const LoginSchema = yup.object({
	email: yup.string().trim().lowercase().email("Email must be valid!").required("Email required!"),
	password: yup.string().trim().required("Password required!"),
});

export const EditProfileSchema = yup.object({
	email: yup.string().trim().lowercase().email("Email must be valid!").required("Email required!"),
	fullname: yup.string().trim().max(45, "Name must be less than 45 characters!").required("Full Name required!"),
	postCode: yup.string().trim().required("Post code required!"),
	phoneNumber: yup.string().trim().required("Phone number required!"),
});
