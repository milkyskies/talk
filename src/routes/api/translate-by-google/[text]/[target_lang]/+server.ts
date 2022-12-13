import { Lang } from "$lib/lang";
import { Translate } from "@google-cloud/translate/build/src/v2";
import { json, type RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ url, params }) => {
	console.log(url.href)

	const trimmed_text = params.text?.trim() ?? ''
	const target_lang = params.target_lang?.trim() ?? 'en'
	const target_lang2 = Lang.to_text_language_code(target_lang)

	if (trimmed_text === '') return json('')

	const translate = new Translate()
	const [translations] = await translate.translate(trimmed_text, target_lang2)

	console.log(translations)

	return json(translations)
}