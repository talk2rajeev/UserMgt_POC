// import React, {Component}  from 'react';
// import { AutoComplete } from 'antd';

// const dataSource = ['Burns Bay Road0', 'Downing Street0', 'Wall Street1', 'Burns Bay Road1', 'Downing Street1', 'Wall Street2', 'Burns Bay Road2', 'Downing Street2', 'Wall Street3'];
// const dataSourceRoles = [{key:1, label:"Admin"}, {key:2,label:'HR'},{key:3, label:"Facility"}, {key:4,label:'IT'}];
// const newDataSourse = dataSourceRoles.map((item,i)=>{
//   return item.key + "-"+ item.label ;
// })



// const AutoSuggestionRoles = (props) => {
//   debugger;
//   return (
//     <AutoComplete
//       style={{ 'width': '100%' }}
//       dataSource={newDataSourse}
//       onSelect = { (value, option)=> {props.selectRole(value, option) } }
//       placeholder="Select Roles"
//       filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  }
//     />
//   );
// }

// export default AutoSuggestionRoles;
import React, {Component}  from 'react';
import { AutoComplete } from 'antd';

const rawDataSource = [{id: 401, name: 'Server Room Access'}, {id: 402, name: 'ODM Room Access'}, {id: 403, name: 'HR portal access'}, {id: 405, name: 'DMM App Access'}, {id: 409, name: 'JIRA Admin access'}];

const getDataSource = (rawDataSource) => {
 let data = null;
 if(typeof rawDataSource[0] === 'object' && typeof rawDataSource[0] !== 'string')
   data = rawDataSource.map((item)=>{  return '['+item.id+'] - '+item.name; });
 else
   data = rawDataSource;
 return data;
}

const AutoSuggestionRoles = (props) => {

 let data = props.data !== undefined && props.data.length > 0 ? getDataSource(props.data) : getDataSource(rawDataSource);
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