import React from "react";
import { toSnakeCase } from "./string";

export const getClassFromProps = (name: string, { className, ...props }: ObjectMap<any> = {}): string =>
{
	name = className ? className + " " + name : name;
	for (let prop in props)
	{
		const p = props[prop];
		if (typeof p === "boolean" && p === true)
			name += ` ${toSnakeCase(prop)}`;
		else if (typeof p === "string")
			name += ` ${toSnakeCase(prop)}-${toSnakeCase(p)}`;
	}
	return name;
};

export const loop = (times: number, callback: (index: number) => void) => 
{
	for (let i = 0; i < times; i++)
		callback(i);
}

export const map = <T extends any>(times: number, callback: (index: number) => T): T[] =>
{
	const arr: T[] = [];
	for (let i = 0; i < times; i++)
		arr.push(callback(i));
	return arr;
}