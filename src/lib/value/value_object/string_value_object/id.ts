import type { PreferNominal } from "$lib/value/value_object"
import { NumberValueObject } from "../number_value_object"

export class Id extends NumberValueObject {
	public id!: PreferNominal

	public constructor(value: number) {
		if (value <= 0) throw new Error('id is not positive number')

		super(value)
	}
}