import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Transfer } from 'antd';

var mockData = [];
// for (let i = 0; i < 8; i++) {
//   mockData.push({
//     key: i.toString(),
//     title: `user-${i}`
//   });
// }

const targetKeys = [
  '2',
  '3'
];
const selectedKeys = [];
const row = {};
var usersInGroup = [];
var groupName = false;
class TransferUserToGroup extends React.Component {
  
  constructor(props) {
    super(props);
    if (this.props.userGroupRow.user != undefined) {
      usersInGroup = this.props.userGroupRow.user.map((item, i) => {
        return item.id;
      })
    }

    this.state = {
      targetKeys: usersInGroup,
      selectedKeys,
      row: this.props.userGroupRow,
      isTransferOpenClose: this.props.isTransferOpen
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.submitAssignedUserList = this.submitAssignedUserList.bind(this);
    this.closeTransfer = this.closeTransfer.bind(this);
  }

  handleChange(nextTargetKeys, direction, moveKeys) {
    debugger;
    this.setState({ targetKeys: nextTargetKeys });
    //setTimeout(()=>{
      this.props.transferHandleChange(nextTargetKeys, direction, moveKeys);
    //}, 200);
    
    // console.log('targetKeys: ', targetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    debugger;
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    debugger;
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll(direction, e) {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }
  closeTransfer() {
    this.setState({ isTransferOpenClose: false });
  }

  componentDidMount(){
    debugger;
   
  

  }
  
  componentWillReceiveProps(nextProps) {
   /* debugger;
    if (nextProps.userGroupRow.user != undefined) {
      usersInGroup = nextProps.userGroupRow.user.map((item, i) => {
        return item.id;
      })
    }else{
      usersInGroup=[];
    }
   // mockData=[];
   
   

    this.setState({
      targetKeys: usersInGroup,
      selectedKeys,
      row: nextProps.userGroupRow,
      isTransferOpenClose: nextProps.isTransferOpen
    });
    */
  }
  componentWillUnmount() {
    debugger;
  }
  submitAssignedUserList() {
    console.log('targetKey: ', this.state.targetKeys);
    debugger;
    var userRow = this.state.row;
    var row = { ...this.state.row }
    let users = this.state.targetKeys;
    row.Users = users;
    this.setState({ row });
  }

  render() {
    const state = this.state;
    const tg =  this.props.type==="create" && this.props.targetKeys.length ===0 ? [] :  state.targetKeys;

    debugger;
    return (
      <div >
        <Transfer
          dataSource={this.props.mockdataa}
           showSearch
          titles={['UserList', this.props.userGroupRow.name]}
          targetKeys={ tg }
          selectedKeys={state.selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          render={item => item.title}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('from TransferUserToGroup control/component: ', state);
  debugger;
  return {
    usergroups: state.usergroupslist.usergroups,
    userlist:state.userlist.users
  }
}
const _TransferUserToGroup = connect(mapStateToProps, null)(TransferUserToGroup);

export default _TransferUserToGroup;
