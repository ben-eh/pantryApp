import { Paper } from "@mui/material";
import { useState } from "react";
import ReactSearchBox from "react-search-box";

const SearchBar = ({ data, onSelect }: any) => {
    return (
        <Paper>
            <ReactSearchBox
                placeholder="Search"
                data={data}
                onSelect={(record: any) => onSelect(record)}
                onChange={(record: any) => {}}
            />
        </Paper>
      );
}

export default SearchBar;