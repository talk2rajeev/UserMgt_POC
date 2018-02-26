import React, {Component}  from 'react';
import { Transfer } from 'antd';

const mockData = [];
for (let i = 0; i < 8; i++) {
  mockData.push({
    key: i.toString(),
    title: `user-${i}`
  });
}

/*const targetKeys = mockData
        .filter(item => +item.key % 3 > 1)
        .map(item => item.key);*/

const targetKeys = [
  '2',
  '3'
];


class TransferUserToGroup extends React.Component {
   
  constructor(props){
    super(props);
    this.state = {
        targetKeys: this.props.targetKeys,
        selectedKeys: [],
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.submitAssignedUserList = this.submitAssignedUserList.bind(this);
      
  }  

  handleChange(nextTargetKeys, direction, moveKeys){
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', targetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange(sourceSelectedKeys, targetSelectedKeys){
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll(direction, e){
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  componentWillReceiveProps(nextProps){
    this.setState({targetKeys: nextProps.targetKeys});
  }

  submitAssignedUserList(){
    console.log('targetKey: ', this.state.targetKeys);
  }

  render() {
    const state = this.state;
    return (
      <div>
      <Transfer
        dataSource={this.props.dataSource}
        titles={['UserList', 'UserGroup']}
        targetKeys={state.targetKeys}
        selectedKeys={state.selectedKeys}
        onChange={this.handleChange}
        onSelectChange={this.handleSelectChange}
        onScroll={this.handleScroll}
        render={item => item.title}
      />
      <button onClick={this.submitAssignedUserList}>assigned user list</button>
      </div>
    );
  }
}

export default TransferUserToGroup;