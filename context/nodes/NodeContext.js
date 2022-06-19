import { createContext, useContext, useState } from "react";

const NodeContext = createContext();

export const useNoteContext = () => useContext(NodeContext);

export default function Context(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', 1);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <NodeContext.Provider value={{
            ctx: { isLoggedIn },
            func: { setIsLoggedIn },
            login: { loginHandler },
            logout: { logoutHandler }
        }}>
            {props.children}
        </NodeContext.Provider>
    );
};