"use client";
import React, { useState } from "react";
import { Button, Input, Space } from "antd";

const { Search } = Input;

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const onSearch = () => {
    console.log(searchQuery);
  }
  return (
    <div>
      <Space.Compact style={{ width: "100%" }}>
        <Search onSearch={onSearch}/>
        <Button type="primary" onClick={() => console.log(searchQuery)}>
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
}
