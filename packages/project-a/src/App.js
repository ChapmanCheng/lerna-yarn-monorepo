import logo from "./logo.svg";
import "./App.css";
import sharedUI from "shared-ui";

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
