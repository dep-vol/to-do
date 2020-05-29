import React from "react";

class LoggedUser {
    isLogged = false;
    logIn = () => {
        this.isLogged = !this.isLogged
    };
}
const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export { UserContext, UserProvider, UserConsumer, LoggedUser}

