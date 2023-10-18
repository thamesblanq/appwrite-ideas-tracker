import { createContext, useState, useEffect } from "react";
import { account, databases } from "../lib/appwrite";
import { ID, Query } from 'appwrite';

const DataContext = createContext({});
/* export const useUser = () => {
    return useContext(DataContext);
} */

export const IDEAS_DATABASE_ID = "65305a594e6f018d6721"; // Replace with your database ID
export const IDEAS_COLLECTION_ID = "65305a7219e89d7591e7"; // Replace with your collection ID



export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [msg, setMsg] = useState("");
    const [ideas, setIdeas] = useState([]);

    const infoMsg = () => {
        setTimeout(() => {
            setMsg("");
        }, 7000);
    }

    //login
    const login = async (email, password) => {
        try{
            const loggedIn = await account.createEmailSession(email, password);
            setUser(loggedIn);
            setIsAuthenticated(true);
            setMsg("Successfully logged in");
            infoMsg();
        }catch(err) {
            console.log(`Error in login: ${err.message}`);
            setIsAuthenticated(false);
            setMsg(`Error in login: ${err.message}`);
            infoMsg();
        }

    }

    //logout
    const logout = async () => {
        try{
            await account.deleteSession("current");
            setUser(null);
            setIsAuthenticated(false);
        } catch(err) {
            console.log(`Error in logout: ${err.message}`)   
        }

    }

    //register
    const register = async (email, password) => {
        try{
            await account.create(ID.unique(), email, password);
            await login(email, password);
            setIsAuthenticated(true);
            setMsg("Account creation was successful");
            infoMsg();
        } catch(err) {
            console.log(`Error in registration: ${err.message}`);
            setIsAuthenticated(false);
            setMsg(`Error in registration: ${err.message}`);
            infoMsg();
        }

    }

    //add idea/create
    const add = async (idea) => {
        const response = await databases.createDocument(
          IDEAS_DATABASE_ID,
          IDEAS_COLLECTION_ID,
          ID.unique(),
          idea
        );
        setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
    }


    //initialize database
    const initDB = async () => {
        const response = await databases.listDocuments(
          IDEAS_DATABASE_ID,
          IDEAS_COLLECTION_ID,
          [Query.orderDesc("$createdAt"), Query.limit(10)]
        );
        setIdeas(response.documents);
    }
    
    //delete item from db/delete
    const remove = async (id) => {
        await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
        setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
        await initDB(); // Refetch ideas to ensure we have 10 items
    }

    //initialize authentication
    const initAuth = async () => {
        try {
        const loggedIn = await account.get();
        setUser(loggedIn);
        } catch (err) {
        setUser(null);
        }
    }

    useEffect(() => {
        initAuth();
        initDB();
    }, []);

    return (
        <DataContext.Provider value={{ current: user, login, logout, register, setUser, isAuthenticated, msg, remove, add, ideas }}>
        {children}
        </DataContext.Provider>
    );

}

export default DataContext;