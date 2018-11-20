import striimi from 'striimi';

const stream = striimi;

export default (() => {
	let locales = {}
	let language = ''
	const localesStream = stream(locales)

	function get(locale) {
		if (typeof locale === 'function')
			return locale(locales[language])

		return locale
			? locales[language][locale]
			: locales[language]
	}

	return Object.assign(get, {
		listen: localesStream.listen,
		subscribe: localesStream.subscribe,

		addLocales(lang, newLocales) {
			locales[lang] = Object.assign({},
				locales[lang],
				newLocales)

			if (lang == language)
				localesStream.emit(locales[lang])
		},

		setLanguage(newLanguage) {
			if (newLanguage !== language) {
				language = newLanguage;
				localesStream.emit(locales[language])
			}
		},

		get,

		getLanguage() {
			return language;
		},

		getLanguages() {
			return Object.keys(locales)
		}
	})
})();