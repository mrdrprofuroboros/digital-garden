import React from "react";
import { TreeData } from "../lib/markdown";
import { SearchData } from "../lib/search";
import dynamic from "next/dynamic";
import FolderTree from "../components/FolderTree";
import { SearchBar } from "../components/Search";

interface HomeElement extends HTMLElement {
	checked: boolean;
}

const DynamicThemeSwitcher = dynamic(
	async () => await import("../components/ThemeSwitcher"),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	},
);

export interface NavBarData {
	cacheData: string;
	tree: TreeData;
	flattenNodes: TreeData[];
	searchIndex: SearchData[];
}

function NavBar({cacheData, tree, flattenNodes, searchIndex}: NavBarData): JSX.Element {
	const burgerId = "hamburger-input";
	const closeBurger = (): void => {
		const element = document.getElementById(burgerId) as HomeElement | null;
		if (element !== null) {
			element.checked = false;
		}
	};

	return (
        <>
            <div className="burger-menu">
                <input type="checkbox" id={burgerId} />
                <label id="hamburger-menu" htmlFor="hamburger-input">
                    <span className="menu">
                        {" "}
                        <span className="hamburger" />{" "}
                    </span>
                </label>
                <nav>
                    <FolderTree
                        tree={tree}
                        flattenNodes={flattenNodes}
                        onNodeSelect={closeBurger}
                    />
                </nav>
            </div>
            <div>
                <nav className="nav-bar">
                    <DynamicThemeSwitcher />
                    <SearchBar index={searchIndex} />
                    <FolderTree tree={tree} flattenNodes={flattenNodes} />
                </nav>
            </div>
        </>
	);
}

export default NavBar;
