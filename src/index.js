import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './ToDoList'
import {Provider} from 'react-redux'
import store from './store'
// antd 的样式
import 'antd/dist/antd.css'; 

//声明一个App组件，然后这个组件用Provider进行包裹。
const App = (
    <Provider store={store}>
        <TodoList />
    </Provider>
)


ReactDOM.render(App ,document.getElementById('root'));

