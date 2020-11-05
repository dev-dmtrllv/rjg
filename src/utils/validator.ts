export class Validator
{
	private _min: number = 0;
	private _max: number = Infinity;
	private _regex: RegExp | null = null;
	private _isAlphaOnly: boolean | null = null;
	private _isAlphaNumeric: boolean | null = null;
	private _isNumericOnly: boolean | null = null;
	private _regexError: string | null = null;


	public min(v: number)
	{
		this._min = v;
		return this;
	}

	public max(v: number)
	{
		this._max = v;
		return this;
	}

	public regex(r: RegExp)
	{
		this._regex = r;
		return this;
	}

	public isAlphaOnly(a: boolean)
	{
		if (this._isNumericOnly)
			throw new Error("numericOnly is set!");
		if (this._isAlphaNumeric)
			throw new Error("alphaNumeric is set!");

		this._isAlphaOnly = a;
		return this;
	}

	public isAlphaNumeric(a: boolean)
	{
		if (this._isNumericOnly)
			throw new Error("numericOnly is set!");
		if (this._isAlphaOnly)
			throw new Error("alpha only is set!");

		this._isAlphaNumeric = a;
		return this;
	}

	public setRegexError(error: string)
	{
		this._regexError = error;
		return this;
	}

	public isNumericOnly(n: boolean)
	{
		if (this._isAlphaNumeric)
			throw new Error("alphaNumeric is set!");
		if (this._isAlphaOnly)
			throw new Error("alpha only is set!");
		this._isNumericOnly = n;
		return this;
	}

	public validate(value: string): null | ValidationError[]
	{
		const errors: ValidationError[] = [];
		if (value.length < this._min)
			errors.push({ type: "min", value: this._min });
		if (value.length > this._max)
			errors.push({ type: "max", value: this._max });
		if (this._isAlphaOnly && !/^[a-z]+$/i.test(value))
			errors.push({ type: "alpha", value: this._isAlphaOnly });
		if (this._isNumericOnly && !/^[a-z]+$/i.test(value))
			errors.push({ type: "numeric", value: this._isNumericOnly });

		if (this._isAlphaNumeric && !/^[a-z0-9]+$/i.test(value))
			errors.push({ type: "alphanumeric", value: this._isAlphaNumeric });
		if (this._regex && !this._regex.test(value))
			errors.push({ type: "regex", value: this._regexError });


		return errors.length > 0 ? errors : null;
	}
}

export type ValidationError = {
	type: ValidationErrorTypes;
	value: any;
}

export type ValidationErrorTypes = "min" | "max" | "regex" | "alpha" | "numeric" | "alphanumeric";
