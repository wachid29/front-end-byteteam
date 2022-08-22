// Styles + Icons
import { formInput } from "@styles/components/Inputs.module.css";

export default function InputText(props) {
	const { name, type, label = null, placeholder = null, withLabel, register, errors } = props;

	return (
		<div className={`d-flex flex-column input-group has-validation ${formInput}`}>
			{withLabel && <span className="fs-14 lato text-gray ms-3">{label}</span>}
			<input
				className={`form-control form-control-lg w-100 lato fs-16 shadow-none pt-0 ${errors[name] && "is-invalid"}`}
				type={type}
				placeholder={placeholder}
				{...register(name)}
			/>
			{errors[name] && <div className="invalid-feedback ms-3">{errors[name].message}</div>}
		</div>
	);
}
