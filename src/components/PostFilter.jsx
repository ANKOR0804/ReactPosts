import React from 'react';
import InputDefault from "./UI/input/InputDefault";
import SelectDefault from "./UI/select/SelectDefault";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <InputDefault
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder="Search..."
      />
      <SelectDefault
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue="Sort by"
        options={[
          {
            value: 'title',
            name: 'Name'
          },
          {
            value: 'body',
            name: 'Body'
          }
        ]}/>
    </div>
  );
};

export default PostFilter;