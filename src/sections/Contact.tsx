import React from "react";
import { Section } from "components/Section";
import { Container, SelectInput } from "components";
import { ValidationError, Validator } from "utils/validator";

import "./styles/contact.scss";
import { capitalize } from "utils/string";

//#region Validators
const nameValidator = new Validator().min(4).max(46).regex(/^[a-z ]+$/i);
const emailValidator = new Validator().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).setRegexError("Invalid email adress!");
const telValidator = new Validator().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).setRegexError("Invalid telephone number!");
const msgValidator = new Validator().min(10).max(1280);
//#endregion

//#region Contact state
const INIT_CONTACT_INPUT_STATE: ContactInputState = {
	name: {
		errors: [],
		validator: nameValidator,
		value: ""
	},
	email: {
		errors: [],
		validator: emailValidator,
		value: ""
	},
	tel: {
		errors: [],
		validator: telValidator,
		value: ""
	},
	message: {
		errors: [],
		validator: msgValidator,
		value: ""
	}
};
//#endregion

//#region Input Fields
const getErrorMessage = (name: string, error: ValidationError) =>
{
	name = capitalize(name);
	switch (error.type)
	{
		case "alpha":
			return `${name} can only contain letters!`;
		case "numeric":
			return `${name} can only contain numers!`;
		case "alphanumeric":
			return `${name} can only contain letters and numbers!`;
		case "max":
			return `${name} can have a maximum of ${error.value} characters!`;
		case "min":
			return `${name} must have at least ${error.value} characters!`;
		case "regex":
			return error.value || `Invalid ${name.toLowerCase()}!`;
	}
}

const InputWarning: React.FC<{ name: string, errors: ValidationError[] }> = ({ name, errors }) =>
{
	if (errors.length === 0)
		return null;

	return (
		<div className="input-warning">
			<div className="wrapper">
				<div className="icon">
					<i className="fas fa-exclamation-circle" />
				</div>
				<div className="msg-panel">
					{errors.map((e, i) => <div className="msg">{getErrorMessage(name, e)}</div>)}
				</div>
			</div>
		</div>
	);
}

const Input: React.FC<InputProps> = ({ name, errors, onChange, value, placeholder = name, type = "text" }) =>
{
	const [hasFocus, setFocus] = React.useState(false);

	const inputTag = type === "textarea" ? type : "input";
	const inputType = type === "textarea" ? undefined : type;

	const handleChange = (e: React.ChangeEvent) => onChange(name, (e.target as any).value);
	const onFocus = () => setFocus(true);
	const onBlur = () => setFocus(false);

	const hidePlaceholder = hasFocus || value.length > 0;
	const hasError = errors.length > 0;

	return (
		<div className={`input-group ${hasError ? "with-errors" : ""}`}>
			<div className={`placeholder ${hidePlaceholder ? "hide" : ""}`}>{placeholder}<span className="colon">:</span></div>
			{React.createElement(inputTag, { type: inputType, name, value, onChange: handleChange, onFocus, onBlur })}
			<InputWarning name={name} errors={errors} />
		</div>
	)
}
//#endregion

export const Contact: React.FC<ContactProps> = ({ contactInfo, title }) => 
{
	const [inputs, setInputs] = React.useState<ContactInputState>(INIT_CONTACT_INPUT_STATE);

	const changeHandler = (name: string, value: string) =>
	{
		if (name in inputs)
		{
			const oldState = inputs[name];
			const errors = oldState.validator?.validate(value) || [];
			setInputs({ ...inputs, [name]: { ...oldState, value, errors } });
		}
	}

	const handleSubmit = () =>
	{
		const data: any = {};

		let hasError = false;
		let didNotChangeInputfield = false;
		for (const name in inputs)
		{
			data[name] = inputs[name].value;

			if (!data[name])
			{
				didNotChangeInputfield = true;
				inputs[name].errors = inputs[name].validator?.validate(inputs[name].value) || [];
			}

			if (inputs[name].errors.length > 0)
				hasError = true;
		}

		if (didNotChangeInputfield)
			setInputs({ ...inputs });
	}

	return (
		<Section id="contact">
			{(active) =>
			{
				return (
					<Container>
						<div className="content">
							<div className="contact-form">
								<h2>{title}</h2>
								<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

									<Input type="text" name="name" placeholder="Your Name" value={inputs.name.value} onChange={changeHandler} errors={inputs.name.errors} />
									<Input type="email" name="email" placeholder="Your Eamil" value={inputs.email.value} onChange={changeHandler} errors={inputs.email.errors} />
									<Input type="tel" name="tel" placeholder="Your Phone Number" value={inputs.tel.value} onChange={changeHandler} errors={inputs.tel.errors} />
									<Input type="textarea" name="message" placeholder="Your message" value={inputs.message.value} onChange={changeHandler} errors={inputs.message.errors} />

									<SelectInput options={[]} placeholder="Choose your course type" />
									<button type="submit">
										Send Inquiry
									</button>
								</form>
							</div>
							<div className="info">
								<div className="inner-info">
									{contactInfo.map(({ icon, title, text, }, i) => (
										<div className="info-point" key={i}>
											<div className="icon">
												<i className={`fas fa-${icon}`} />
											</div>
											<div className="content">
												<div className="title">{title}</div>
												<div className="text">{text}</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</Container>
				);
			}}
		</Section>
	);
};

type InputStateData = {
	value: string;
	errors: ValidationError[];
	validator: Validator | null;
};

type InputProps = {
	onChange: (name: string, value: string) => void;
	name: string;
	placeholder?: string;
	value: string;
	errors: ValidationError[];
	type?: "text" | "tel" | "email" | "password" | "textarea";
}

type ContactInputState = {
	name: InputStateData;
	email: InputStateData;
	tel: InputStateData;
	message: InputStateData;
} & { [name: string]: InputStateData };

type ContactInfo = {
	icon: string;
	title: string;
	text: string;
};

export type ContactProps = {
	title: string;
	contactInfo: ContactInfo[];
};
