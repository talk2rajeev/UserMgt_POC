
import React, {Component}  from 'react';
import { AutoComplete } from 'antd';

const rawDataSource = [];

const getDataSource = (dataSource) => {
 let data = null;
 if(typeof dataSource[0] === 'object' && typeof dataSource[0] !== 'string')
   data = dataSource.map((item)=>{  return '['+item.id+'] - '+item.name; });
 else
   data = dataSource;
 return data;
}

const AutoSuggestionRoles = (props) => {

 let data = props.data !== undefined && props.data.length > 0 ? getDataSource(props.data) : [];
 let placeholder = props.placeholder || 'Plea Select';

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

export default AutoSuggestionRoles;