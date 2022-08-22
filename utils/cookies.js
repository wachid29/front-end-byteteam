import parse from "parse-duration";

const cookiesOptions = {
	maxAge: parse(process.env.NEXT_PUBLIC_COOKIE_EXPIRE) / 1000,
};

export default cookiesOptions;
