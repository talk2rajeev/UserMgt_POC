import React, {Component}  from 'react';

import { Select, Radio } from 'antd';
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


class SelectTags extends React.Component {
    
    // processData(data){
    //     let newdata =  data.map((item)=>{
    //         return item.name;
    //     })
    //     return newdata;
    // }

    dataSource(data){
        let children = [];
        for (let i = 0; i < data.length; i++) {
            children.push(<Option key={data[i].name}>{data[i].name}</Option>);
        }
        return children;
    }

    getPlaceholder(placeholder){
        return placeholder || "Please select";
    }


    render() {
        return (
            <div>
                <Select
                    mode="multiple"
                    size="default"
                    placeholder={ this.getPlaceholder(this.props.placeholder) }
                    defaultValue={ this.props.defaultData }
                    onChange={this.props.handleChange}
                    style={{ width: '100%' }}
                >
                    { this.dataSource(this.props.data) }
                </Select>
            </div>
        );
    }
}

export default SelectTags;