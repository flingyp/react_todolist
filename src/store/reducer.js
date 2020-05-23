import {SET_INPUT_VALUE, SET_DATA, SET_DATA_STATUS, DELETE_ITEM} from './actionType'

//生成n位数字字母混合字符串
function generateMixed(n) {
    var chars = ['0','1','2','3','4','5','6','7','8','9',
                'A','B','C','D','E','F','G','H','I','J','K','L','M',
                'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i++) {
       var id = Math.floor(Math.random()*36);
       res += chars[id];
    }
    return res;
}

const defaultState = {
    inputValue: '请输入内容:',
    data: [
        {
            content: '早上吃饭',
            status: true,
            id: generateMixed(8)
        },
        {
            content: '中午吃饭',
            status: true,
            id: generateMixed(8)
        },
        {
            content: '晚上吃饭',
            status: false,
            id: generateMixed(8)
        },
        {
            content: '别吃饭',
            status: false,
            id: generateMixed(8)
        },
        {
            content: '睡觉',
            status: false,
            id: generateMixed(8)
        },
    ]
} 

export default (state = defaultState, action) => {
    if(action.type === SET_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    if(action.type === SET_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.data.push({
            content: newState.inputValue,
            status: false,
            id:  generateMixed(8)
        })
        newState.inputValue = defaultState.inputValue
        return newState
    }

    if(action.type === SET_DATA_STATUS) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.data.forEach((item) => {
            if(item.id === action.id) {
                item.status = !item.status
            } 
        })
        return newState
    }

    if(action.type === DELETE_ITEM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.data.forEach((item, index) => {
            if(item.id === action.id) {
                newState.data.splice(index, 1)
            }
        })
        return newState
    }

    return state
}