import { getAllContentFilePaths, getDirectoryData, toSlug } from "../lib/slug";
import { getLocalGraphData, LocalGraphData } from "../lib/graph";
import { TreeData } from "../lib/markdown";
import { getSearchIndex, SearchData } from "../lib/search";
import {
	getBackLinks,
	getCacheData,
	initCache,
	isMediaFile,
	toFileName,
	toFilePath,
	toRawFileName,
} from "volglass-backend";
import {
	clearPublicDir,
	copyToPublicFolder,
	getMarkdownFolder,
	getPublicFolder,
	readFileSync,
} from "../lib/io";
import dynamic from "next/dynamic";
import MDContent from "../components/MDContentData";

// TODO make customizable
// FIXME This should be a string field, but I don't know to avoid init error
export function FIRST_PAGE(): string {
	return "README";
}

// This trick is to dynamically load component that interact with window object (browser only)
const DynamicGraph = dynamic(async () => await import("../components/Graph"), {
	loading: () => <p>Loading ...</p>,
	ssr: false,
});
export interface Prop {
	slugName: string;
	fileName: string;
	markdownContent: string;
	graphData: LocalGraphData;
	backLinks: string;
}

export default function Page({
	slugName,
	fileName,
	markdownContent,
	backLinks,
	graphData,
}: Prop): JSX.Element {
	return (
		<>
			<MDContent
				slugName={slugName}
				fileName={fileName}
				content={markdownContent}
				backLinks={backLinks}
			/>
			{!slugName.match(".canvas") ? (
				<DynamicGraph graph={graphData} />
			) : (
				<></>
			)}
		</>
	);
}

export async function getStaticPaths(): Promise<{
	paths: Array<{ params: { id: string[] } }>;
	fallback: false;
}> {
	clearPublicDir();
	const directoryData = getDirectoryData();
	const searchIndex = getSearchIndex();
	const slugs = await initCache(
		JSON.stringify(directoryData),
		JSON.stringify(searchIndex),
		getAllContentFilePaths,
		getMarkdownFolder,
		getPublicFolder,
		toSlug,
		readFileSync,
		copyToPublicFolder,
	);
	// TODO allows to put in image files in `posts` directory
	const paths = slugs
		.map((p) => ({
			params: { id: p.replace(/^\//, "").split("/") },
		}))
		.filter((p) => p.params.id.length !== 0 && p.params.id[0] !== "");
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({
	params,
}: {
	params: { id: string[] };
}): Promise<{ props: Prop }> {
	const [cacheData, rawTreeData, rawSearchIndex] = await getCacheData();
	
	const slugString = `/${params.id.join("/")}`;
	const slugName = toFileName(slugString, cacheData);
	const fileName = toRawFileName(slugString, cacheData) ?? slugName;
	const filePath = toFilePath(slugString, cacheData);
	const markdownContent = isMediaFile(slugName) ? "" : readFileSync(filePath);
	const backLinks = getBackLinks(slugString, cacheData, readFileSync);
	const graphData = getLocalGraphData(slugString, cacheData);

	return {
		props: {
			slugName,
			fileName,
			markdownContent,
			backLinks,
			graphData,
		},
	};
}
