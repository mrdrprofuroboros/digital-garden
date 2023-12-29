import Page, {
	FIRST_PAGE,
	getStaticProps as getDefaultStaticProps,
	Prop,
} from "./[...id]";

export const Index = (prop: Prop) => Page(prop);

export const getStaticProps = async () =>
	getDefaultStaticProps({ params: { id: [FIRST_PAGE()] } });

export default Index;
