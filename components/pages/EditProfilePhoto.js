import { useState } from "react";
import { useDropzone } from "react-dropzone";
import fetcher from "@utils/axios/fetcher";
import Swal from "sweetalert2";

// Styles + Icons
import { MdOutlineAddAPhoto } from "react-icons/md";

export default function EditProfilePhoto(props) {
	const { id } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const onDrop = (accepted, rejected) => {
		setErrors(null);
		if (rejected.length > 0) {
			setErrors(rejected[0].errors.map((error) => error.message));
		} else {
			setSelectedFile(accepted[0]);
		}
	};

	const onUpload = (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append("id", id);
		formData.append("photo", selectedFile);
		fetcher
			.postPhotoProfile(formData)
			.then(() => {
				Swal.fire({
					icon: "success",
					text: "Edit Profile Success",
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					text: `${err?.response?.data}`,
				});
			})
			.finally(() => {
				setSelectedFile(null);
				setErrors(null);
				setIsLoading(false);
			});
	};

	const allowedFile = { "image/jpg": [".jpg"], "image/jpeg": [".jpeg"], "image/png": [".png"] };
	const dropzoneOptions = { onDrop, multiple: false, maxFiles: 1, maxSize: 2 * 1000000, accept: allowedFile };
	const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

	return (
		<form onSubmit={onUpload}>
			<div className="d-flex flex-column gap-2">
				<span className="fs-12 text-blue ls-3 fw-medium">PROFILE</span>
				<span className="fs-18 text-black fw-semibold">Photo Profile</span>
				<div className="d-flex flex-column align-items-center justify-content-center mt-2 w-100" {...getRootProps()}>
					<input type="file" hidden {...getInputProps()} />
					<label className="w-100 rounded-3 bg-light">
						<div className="position-relative d-flex flex-column align-items-center w-100 p-4 gap-1">
							<MdOutlineAddAPhoto size={22} className="text-blue" />
							<span className="fs-12 lato">{selectedFile?.path || "Edit Profile Image"}</span>
						</div>
					</label>
				</div>
				<div className="d-flex flex-column gap-2">
					{errors &&
						errors.map((el, i) => (
							<span className="text-red fs-12" key={i}>
								- {el}
							</span>
						))}
				</div>
				<button className="btn btn-blue w-100 fs-16 fw-bold py-3 mt-1" type="submit" disabled={isLoading || !selectedFile}>
					{isLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
					{isLoading ? "Loading..." : "Save Photo"}
				</button>
			</div>
		</form>
	);
}
