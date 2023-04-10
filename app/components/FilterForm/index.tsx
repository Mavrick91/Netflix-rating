import { Form, Link, useSearchParams } from "@remix-run/react";
import type { FC } from "react";
import React, { memo, useCallback } from "react";
import undoArrow from "~/assets/icons/undo-arrow.png";
import Button from "~/components/Button";
import type { Item } from "~/components/input/Select";
import Select from "~/components/input/Select";
import Text from "~/components/input/Text";
import {
  genresShow,
  languageShow,
  platformsShow,
  showTypes,
  supportedCountries,
} from "~/constants/filterConstants";
import styles from "~/styles/filterForm.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
  cancelQueries: () => void;
};

const FilterForm: FC<Props> = ({ cancelQueries }) => {
  const [searchParams] = useSearchParams();

  const findDefaultValue = useCallback(
    (items: Item[], queryString: string) => {
      const param = searchParams.getAll(queryString);

      if (param.length >= 1) {
        const itemsFound = items.filter((item) =>
          param.includes(`${item.value}`)
        );
        if (itemsFound.length >= 1) return itemsFound;
      }
      return items.filter((item) => item.isDefault);
    },
    [searchParams]
  );

  return (
    <Form className="category-filter-form">
      <Select
        label="Type"
        name="show_type"
        items={showTypes}
        value={findDefaultValue(showTypes, "show_type")}
      />
      <Select
        label="Language"
        name="show_original_language"
        items={languageShow}
        value={findDefaultValue(languageShow, "show_original_language")}
      />
      <Select
        label="Available in country"
        name="country"
        items={supportedCountries}
        value={findDefaultValue(supportedCountries, "country")}
      />
      <Select
        label="Genre"
        name="genre"
        items={genresShow}
        value={findDefaultValue(genresShow, "genre")}
      />
      <Text
        label="Find by keyword"
        name="keyword"
        placeholder="Search shows by keyword"
        value={searchParams.get("keyword") || ""}
      />
      <Select
        label="Choose the platforms"
        items={platformsShow}
        max={4}
        name="services"
        value={
          findDefaultValue(platformsShow, "services") || [
            platformsShow[2],
            platformsShow[3],
            platformsShow[4],
            platformsShow[6],
          ]
        }
      />
      <Button type="submit" onClick={cancelQueries}>
        Filter
      </Button>
      <Link to="/" prefetch="render">
        <Button type="button">
          <img src={undoArrow} alt="Icon undo" />
        </Button>
      </Link>
    </Form>
  );
};

export default memo(FilterForm);
