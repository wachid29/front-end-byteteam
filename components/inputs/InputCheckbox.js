export default function InputCheckbox(props) {
	const { name, placeholder, register, errors } = props;

	return (
		<div className="form-check lato fs-16 text-darkgray">
			<input className={`form-check-input ${errors[name] && "is-invalid"}`} type="checkbox" {...register(name)} />
			<label className="form-check-label">{placeholder}</label>
			{errors[name] && <div className="invalid-feedback">{errors[name].message}</div>}
		</div>
	);
}
