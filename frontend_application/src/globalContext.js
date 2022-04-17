import React, { createContext } from 'react'

const globalContext = createContext()

// function DataProvider = ({ user }) => {
//   const state = {
//     token: [token, setToken],
//     productsAPI: ProductsAPI(),
//     userAPI: UserAPI(token),
//     categoriesAPI: CategoriesAPI()
//   }

//   return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
// }

export default globalContext;