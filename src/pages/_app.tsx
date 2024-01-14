import "reactflow/dist/style.css";
import "../styles/global.css";
import "../styles/style.css";
import "../styles/prism.css";
import "../styles/prism-dark.css";
import { AppProps } from "next/app";
import { getSharedContext } from "../lib/context";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

export default async function App({ Component, pageProps }: AppProps): Promise<JSX.Element> {
	const navBarProps = await getSharedContext();
	return (
		<Layout>
			<div className="fixed flex h-full w-full flex-row overflow-hidden dark:bg-dark-background-primary">
				<NavBar {...navBarProps} />;
				<Component {...pageProps} />;
			</div>
		</Layout>
	);
}
