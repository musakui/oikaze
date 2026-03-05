import ':oikaze.css'
import './styles.css'
import page from './demo.js'

const app = document.getElementById('app')
app.innerHTML = page

if (import.meta.hot) {
	import.meta.hot.accept('./demo.js', (m) => {
		app.innerHTML = m.default
	})
}
