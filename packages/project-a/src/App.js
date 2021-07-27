import "./App.css";
import sharedUI from "shared-ui";
import "shared-ui/dist/main.css";
// ! require *.d.ts typescript file for intellisense

function App() {
	console.log(sharedUI);
	const { Button, Header, ButtonJSX, ButtonTS } = sharedUI;
	return (
		<div className="App">
			<Header />
			<Button />
			<ButtonJSX />
			<ButtonTS />
		</div>
	);
}

export default App;
