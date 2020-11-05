import React from "react";

export const SelectInput: React.FC<SelectInputProps> = ({ placeholder, options }) =>
{
	const o = new Map();
	return (
		<div className="select-input">
			{}
		</div>
	);
}

type SelectInputProps = {
	placeholder: string;
	options: string[];
};
