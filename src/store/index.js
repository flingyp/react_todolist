// 1. 导入 createStore
import { createStore } from 'redux'

// 2. 导入 reducers 纯函数 (想象成 图书管理员 用于派发数据)
import reducer from './reducer'

// 3. 创建 store 仓库   (想象成 图书仓库)
let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store