import { AssetsTableComponent } from "../assets-table";

export const TopPriceComponent = (props: any) => {
  const { assets } = props;

  return <AssetsTableComponent assets={assets} />;
};
export default TopPriceComponent;
