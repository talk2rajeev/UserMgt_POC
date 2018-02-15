import React, {Component}  from 'react';
import { AutoComplete } from 'antd';

const dataSource = [{id: 401, name: 'Server Room Access'}, {id: 402, name: 'ODM Room Access'}, {id: 403, name: 'HR portal access'}, {id: 405, name: 'DMM App Access'}, {id: 409, name: 'JIRA Admin access'}];

let newDS = dataSource.map((item)=>{
  return '['+item.id+'] - '+item.name;
});


const AutoSuggestion = (props) => {
  return (
    <AutoComplete
      style={{ 'width': '100%' }}
      dataSource={newDS}
      onSelect = { (value, option)=> {props.selectRole(value, option) } }
      placeholder="Select Permissions"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  }
    />
  );
}

export default AutoSuggestion;