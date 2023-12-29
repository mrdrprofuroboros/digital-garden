import { getCacheData } from "volglass-backend";
import { getFlattenArray, TreeData } from "./markdown";
import { SearchData } from "./search";

interface SharedContext {
    cacheData: any;
    tree: TreeData;
    flattenNodes: TreeData[];
    searchIndex: SearchData[];
}

let sharedContext: SharedContext | null = null;

export const getSharedContext = async (): Promise<SharedContext> => {
    if (sharedContext !== null) {
        return sharedContext;
    }
	const [cacheData, rawTreeData, rawSearchIndex] = await getCacheData();
	const tree: TreeData = JSON.parse(rawTreeData);
	const searchIndex: SearchData[] = JSON.parse(rawSearchIndex);
	const flattenNodes = getFlattenArray(tree);

    sharedContext = {
        cacheData,
        tree,
        flattenNodes,
        searchIndex,
    }
    return sharedContext;
};