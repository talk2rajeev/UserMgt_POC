import React, {Component}  from 'react';
import { AutoComplete } from 'antd';

const rawDataSource = [];

const getDataSource = (rawDataSource) => {
  let data = null;
  if(typeof rawDataSource[0] === 'object' && typeof rawDataSource[0] !== 'string')
    data = rawDataSource.map((item)=>{  return '['+item.id+'] - '+item.name; });
  else
    data = rawDataSource;
  return data;
}

const AutoSuggestion = (props) => {

  let data = props.data !== undefined && props.data.length > 0 ? getDataSource(props.data) : getDataSource(rawDataSource);
  let placeholder = props.placeholder || 'Please Select';

  return (
    <AutoComplete
      style={{ 'width': '100%' }}
      dataSource={data}
      onSelect = { (value, option)=> {props.selectRole(value, option) } }
      placeholder={placeholder}
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  }
    />
  );

}

export default AutoSuggestion;