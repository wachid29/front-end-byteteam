import { useState } from "react";

// Styles + Icons
import { inputGroup } from "@styles/components/Inputs.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function InputPassword(props) {
	const { name, label, placeholder, withLabel, register, errors } = props;
	const [showPass, setShowPass] = useState(false);

	return (
		<div className={`d-flex flex-column input-group has-validation ${inputGroup}`}>
			{withLabel && <span className="fs-14 lato text-gray ms-3">{label}</span>}
			<div className="d-flex">
				<input
					className={`form-control form-control-lg w-100 lato fs-16 shadow-none pt-0 ${errors[name] && "is-invalid"}`}
					type={showPass ? "text" : "password"}
					placeholder={placeholder}
					{...register(name)}
				/>
				<span className="input-group-text shadow-none bg-white cursor-pointer" onClick={() => setShowPass(!showPass)}>
					{showPass && <BsEyeSlash size={25} className="text-blue" />}
					{!showPass && <BsEye size={25} className="text-blue" />}
				</span>
			</div>
			{errors[name] && <div className="invalid-feedback ms-3">{errors[name].message}</div>}
		</div>
	);
}
