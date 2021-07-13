import logo from "./logo.svg";
import "./App.css";
import sharedUI from "shared-ui";

function App() {
	const { Button, Header, ButtonJSX } = sharedUI;
	return (
		<div className="App">
			<Header />
			<Button />
			<ButtonJSX />
		</div>
	);
}

export default App;
