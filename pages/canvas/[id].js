import Head from "next/head";
import Layout from "../../components/Layout";
import {
  getAllSlugs,
  getSingleCanvas,
  convertObject,
  getDirectoryData,
  getFlattenArray,
} from "../../lib/utils";
import FolderTree from "../../components/FolderTree";
import Canvas from "../../components/Canvas";
import "reactflow/dist/style.css";

export default function Home({
  note,
  tree,
  flattenNodes,
}) {
    const { nodes, edges } = note.data;
    return (
        <Layout>
            <Head>
                {note.title && <meta name="title" content={note.title} />}
            </Head>
            <div className="container">
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes} />
                </nav>
                <Canvas nodes={nodes} edges={edges} />
            </div>
        </Layout>
    );
}

const allPostsData = getAllSlugs();
const paths = allPostsData.map((p) => ({ params: { id: p } }));

export async function getStaticPaths() {
    return {
        paths,
        fallback: false,
    };
}

export function getStaticProps({ params }) {
    const note = getSingleCanvas(params.id);
    const tree = convertObject(getDirectoryData());
    const flattenNodes = getFlattenArray(tree);

    return {
        props: {
            note,
            tree: tree,
            flattenNodes: flattenNodes,
        },
    };
}
