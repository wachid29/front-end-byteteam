// Styles + Icons
import { formInput } from "@styles/components/Inputs.module.css";

export default function InputSelect(props) {
	const { data, name, label, withLabel, register, errors } = props;

	return (
		<div className={`d-flex flex-column input-group has-validation ${formInput}`}>
			{withLabel && <span className="fs-14 lato text-gray ms-3">{label}</span>}
			<select className={`form-select w-100 lato fs-16 shadow-none px-3 py-2 pb-3 ${errors[name] && "is-invalid"}`} {...register(name)}>
				{data.map((el) => (
					<option key={el.id_place} value={el.id_place}>
						{el.city}
					</option>
				))}
			</select>
			{errors[name] && <div className="invalid-feedback ms-3">{errors[name].message}</div>}
		</div>
	);
}
