// Theme store: toggles between the DaisyUI `superior` (light) and
// `superior-dark` themes via the `data-theme` attribute on <html>, persisting
// the choice. The initial theme is set before paint by the inline script in
// app.html.

type Theme = 'superior' | 'superior-dark';

class ThemeStore {
	current = $state<Theme>('superior');

	get isDark() {
		return this.current === 'superior-dark';
	}

	init() {
		if (typeof document === 'undefined') return;
		const attr = document.documentElement.getAttribute('data-theme');
		this.current = attr === 'superior-dark' ? 'superior-dark' : 'superior';
	}

	toggle() {
		this.current = this.current === 'superior-dark' ? 'superior' : 'superior-dark';
		document.documentElement.setAttribute('data-theme', this.current);
		try {
			localStorage.setItem('theme', this.current);
		} catch {
			// ignore (private mode, etc.)
		}
	}
}

export const theme = new ThemeStore();
