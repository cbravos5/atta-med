import { Autocomplete, AutocompleteProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

type Props = {
  onSearch: (searchValue: string) => void;
} & AutocompleteProps;

export function SearchInput({ onSearch, ...props }: Props) {
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 300);

  useEffect(() => {
    if (debounced) onSearch(debounced);
  }, [debounced]);

  return <Autocomplete filter={() => true} onChange={(value) => setSearch(value)} {...props} />;
}
