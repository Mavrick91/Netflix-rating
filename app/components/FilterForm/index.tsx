import { Form } from "@remix-run/react";
import React from "react";
import undoArrow from "~/assets/icons/undo-arrow.png";
import Button from "~/components/Button";
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

const FilterForm = () => {
  return (
    <Form className="category-filter-form">
      <Select label="Type" name="show_type" items={showTypes} />
      <Select
        label="Language"
        name="show_original_language"
        items={languageShow}
      />
      <Select
        label="Available in country"
        name="country"
        items={supportedCountries}
      />
      <Select label="Genre" name="genre" items={genresShow} />
      <Text
        label="Find by keyword"
        name="keyword"
        placeholder="Search shows by keyword"
      />
      <Select
        label="Choose the platforms"
        items={platformsShow}
        max={4}
        name="services"
        value={[
          platformsShow[2],
          platformsShow[3],
          platformsShow[4],
          platformsShow[6],
        ]}
      />
      <Button type="submit">Filter</Button>
      <Button type="reset">
        <img src={undoArrow} alt="Icon undo" />
      </Button>
    </Form>
  );
};

export default FilterForm;
