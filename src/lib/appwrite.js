import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652edcef3e40c9151176');

export const account = new Account(client);
//export { id } from 'appwrite';
export const databases = new Databases(client);