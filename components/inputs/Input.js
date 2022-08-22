import { useFormContext } from "react-hook-form";

// Components
import InputText from "@components/inputs/InputText";
import InputPassword from "@components/inputs/InputPassword";
import InputCheckbox from "@components/inputs/InputCheckbox";
import InputSelect from "@components/inputs/InputSelect";

export default function Input(props) {
	const { data = null, type, name, label = null, placeholder = null, withLabel = false } = props;
	const { register, formState } = useFormContext();
	const { errors } = formState;

	if (type === "password") {
		return <InputPassword name={name} register={register} errors={errors} placeholder={placeholder} label={label} withLabel={withLabel} />;
	} else if (type === "checkbox") {
		return <InputCheckbox name={name} register={register} errors={errors} placeholder={placeholder} />;
	} else if (type === "select") {
		return <InputSelect data={data} name={name} register={register} errors={errors} label={label} withLabel={withLabel} />;
	} else {
		return <InputText type={type} name={name} register={register} errors={errors} placeholder={placeholder} label={label} withLabel={withLabel} />;
	}
}
