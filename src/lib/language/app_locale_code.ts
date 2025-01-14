import type { SpeechLanguageCode } from '../speech/speech_language_code'

export class AppLocaleCode {
	private readonly _app_locale_code: undefined
	private readonly _code: string

	public static readonly english = new AppLocaleCode('en')
	public static readonly japanese = new AppLocaleCode('ja')
	public static readonly chinese_taiwan = new AppLocaleCode('zh-TW')
	public static readonly korean = new AppLocaleCode('ko')
	public static readonly khmer = new AppLocaleCode('km')

	public static readonly values = [
		AppLocaleCode.english,
		AppLocaleCode.japanese,
		AppLocaleCode.chinese_taiwan,
		AppLocaleCode.korean,
		AppLocaleCode.khmer,
	]

	public static get default(): AppLocaleCode {
		return AppLocaleCode.english
	}

	public constructor(code: string | undefined) {
		const trimmed_locale_code = code?.trim() ?? ''

		if (!trimmed_locale_code) {
			this._code = AppLocaleCode.default.code
		} else {
			const language_code = trimmed_locale_code.toLowerCase().split('-')[0]

			this._code = language_code
		}
	}

	public static fromSpeechLanguageCode(speech_language_code: SpeechLanguageCode): AppLocaleCode {
		const speech_language_code_string = speech_language_code.code
		const language_code =
			speech_language_code_string === 'yue' ? 'zh-TW' : speech_language_code_string

		return new AppLocaleCode(language_code)
	}

	public get code(): string {
		return this._code
	}
}
