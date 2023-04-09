import type { Dispatch, FC, SetStateAction } from "react";
import Select from "~/components/input/Select";
import { sorterByDate, sorterByOthers } from "~/constants/sorterConstants";
import type { SoterOptions } from "~/routes";
import styles from "~/styles/sortableList.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  setSorterOptions: Dispatch<SetStateAction<SoterOptions>>;
};
const SortableList: FC<Props> = ({ setSorterOptions }) => {
  return (
    <div className="container-sortable">
      <Select
        label="Years"
        items={sorterByDate}
        max={999}
        onChange={(value) => {
          setSorterOptions((prev) => ({
            ...prev,
            year: value.map((item) => item.value as number).filter(Boolean),
          }));
        }}
      />
      <Select
        label="Sort by"
        items={sorterByOthers}
        onChange={(value) => {
          setSorterOptions((prev) => ({
            ...prev,
            other: value[0].value as string,
          }));
        }}
      />
    </div>
  );
};

export default SortableList;
