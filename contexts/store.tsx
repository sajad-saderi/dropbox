import { createContext, useState } from 'react';

const AppStore = createContext({
    isAuth: false,
    setAuth: (v: any) => { },
    getList: false,
    setGetList: (v: boolean) => { }
})

export const StoreProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(false)
    const [list, setList] = useState(false)
    return (<AppStore.Provider value={{
        isAuth: auth,
        setAuth: (v) => setAuth(v),
        getList: list,
        setGetList: (v) => setList(v)
    }}>{children} </AppStore.Provider>)
}


export default AppStore
