import React, { Component } from 'react';
import './list.css'
import { connect } from 'react-redux'
import { Input, Button, List, Checkbox  } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {SET_INPUT_VALUE, SET_DATA, SET_DATA_STATUS, DELETE_ITEM} from './store/actionType'


class ToDoList extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <div>
                <header className="header">
                    <h2 className="title">ToDoList</h2>
                    <Input 
                        // placeholder="请输入内容:" 
                        value={this.props.inputValue}
                        style={{outline: 'none', border: '0', marginRight: '8px'}} 
                        onChange={this.props.changeInputValue}
                    />
                    <Button type="primary" onClick={this.props.submitContent}>提交</Button>
                </header>

                <section className="content">
                    <div className="doing">
                        <h2>正在进行</h2>
                        <List
                            bordered
                            dataSource={this.props.ing}
                            renderItem={(item) => (
                                <List.Item>
                                    <Checkbox 
                                        style={{marginRight: '20px'}}
                                        defaultChecked={item.status} 
                                        checked={item.status} 
                                        onChange={() => this.props.setDataStatus(item)}>
                                    </Checkbox> 
                                    {item.content}
                                    <Button 
                                        style={{marginLeft: '20px'}} 
                                        type="primary" shape="circle" 
                                        size="small" 
                                        danger 
                                        icon={<CloseOutlined />}
                                        onClick= {() => this.props.deleteItem(item)} 
                                    />
                                </List.Item>
                            )}
                        />
                    </div>

                    <div className="ok">
                        <h2>已完成</h2>
                        <List
                            bordered
                            dataSource={this.props.finish}
                            renderItem={item => (
                                <List.Item>
                                    <Checkbox 
                                        style={{marginRight: '20px'}}
                                        defaultChecked={item.status} 
                                        checked={item.status}
                                        onChange={() => this.props.setDataStatus(item)}>
                                    </Checkbox> 
                                    {item.content}
                                    <Button 
                                        style={{marginLeft: '20px'}} 
                                        type="primary" shape="circle" 
                                        size="small" 
                                        danger 
                                        icon={<CloseOutlined />} 
                                        onClick= {() => this.props.deleteItem(item)} 
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

    /**
     * 用于过滤任务列表完成的数据
     */
    const filterFinish = (data) => {
        let arr = []
        data.forEach(item => {
            if(item.status) {
                arr.push(item)
            }
        })
        return arr
    }

    /**
     * 用于过滤任务列表进行的数据
     */
    const filterIng = (data) => {
        let arr = []
        data.forEach(item => {
            if(!item.status) {
                arr.push(item)
            }
        })
        return arr
    }
    


const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        data: state.data,
        finish: filterFinish(state.data),
        ing: filterIng(state.data)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /**
         * 用户在输入框输入内容时 执行的函数 
         */
        changeInputValue: (e) => {
            // 获取 输入框输入的内容
            const value = e.target.value
            // 改变 store 的 inputValue 的值
            dispatch({
                type: SET_INPUT_VALUE,
                value
            })
        },

        /**
         * 用户点击提交时 向 正在运行 添加任务 默认 status 为 false
         */
        submitContent: () => {
            dispatch({
                type: SET_DATA
            })
        },

        setDataStatus: (item) => {
            // 获取 任务 id
            const id = item.id
            dispatch({
                type: SET_DATA_STATUS,
                id
            })
        },

        deleteItem: (item) => {
            // 获取 任务 id
            const id = item.id
            dispatch({
                type: DELETE_ITEM,
                id
            })
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);