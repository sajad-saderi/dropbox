import { createContext, useState } from 'react';

const AppStore = createContext({
    isAuth: false,
    setAuth: (v: any) => { }
})

export const StoreProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(false)
    return (<AppStore.Provider value={{
        isAuth: auth,
        setAuth: (v) => { console.log('in context', v); setAuth(v) }
    }}>{children} </AppStore.Provider>)
}


export default AppStore
