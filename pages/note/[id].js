import Head from "next/head";
import Layout from "../../components/Layout";
import {
    getAllSlugs,
    getFlattenArray,
    getSinglePost,
    convertObject,
    getDirectoryData,
    constructGraphData,
    getLocalGraphData
} from "../../lib/utils";
import FolderTree from "../../components/FolderTree";
import MDContent from "../../components/MDContent";
import dynamic from 'next/dynamic'

const DynamicGraph = dynamic(
    () => import('../../components/Graph'),
    { loading: () => <p>Loading ...</p>, ssr: false }
)

export default function Home({note, backLinks, fileNames, tree, flattenNodes, graphData}) {
    return (
        <Layout>
            <Head>
                {note.title && <meta name="title" content={note.title}/>}
            </Head>
            <div className='container'>
                <nav className="nav-bar">
                    <FolderTree tree={tree} flattenNodes={flattenNodes}/>
                </nav>
                <MDContent name={note.name} content={note.data} fileNames={fileNames} handleOpenNewContent={null} backLinks={backLinks}/>
                <DynamicGraph graph={graphData}/>
            </div>

        </Layout>
    );
}

export async function getStaticPaths() {
    const allPostsData = getAllSlugs();
    const paths = allPostsData
        .filter((p) => !p.endsWith('.canvas'))
        .map((p) => ({ params: { id: p } }));

    return {
        paths,
        fallback: false
    };
}

const tree = convertObject(getDirectoryData());
const flattenNodes = getFlattenArray(tree);

const {nodes, edges} = constructGraphData()

export function getStaticProps({ params }) {
    console.log(params.id)
    const note = getSinglePost(params.id);
    const listOfEdges =   edges.filter(anEdge => anEdge.target === params.id)
    const internalLinks = listOfEdges.map(anEdge => nodes.find(aNode => aNode.slug === anEdge.source)).filter(element => element !== undefined)
    const backLinks = [...new Set(internalLinks)]
    const graphData = getLocalGraphData(params.id)
    return {
        props: {
            note,
            tree: tree,
            flattenNodes: flattenNodes,
            backLinks: backLinks.filter(link => link.slug !== params.id),
            graphData: graphData
        },
    };
}
