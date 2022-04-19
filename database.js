// ------------------------------------------------------------------------------------------------
// Author: 0xLunar.eth
// Date: 19/04/2022
// Description: Local JSON Database tool
// ------------------------------------------------------------------------------------------------

const fs = require('fs');

class Database {
    constructor(fileName){
        this.fileName = fileName;
        this.data = {};
        this.load();
    }

    /**
     * Load Database from file
     */
    load(){
        if (fs.existsSync(this.fileName)){
            this.data = JSON.parse(fs.readFileSync(this.fileName, 'utf8'));
        } else {
            this.save();
            this.load();
        }
    }

    /**
     * Save Database to file
     */
    save(){
        fs.writeFileSync(this.fileName, JSON.stringify(this.data));
    }

    /**
     * Add a Collection to Database
     * @param {string} name Name of Collection
     */
    addCollection(name){
        this.data[name] = new Collection(name);
    }

    /**
     * Remove a Collection from Database
     * @param {string} name Name of Collection
     */
    removeCollection(name){
        delete this.data[name];
    }

    /**
     * Get a Collection from Database
     * @param {string} name Name of Collection
     */
    getCollection(name){
        this.data[name] = new Collection(name, this.data[name].data);
        return this.data[name];
    }

}

class Collection {
    constructor(collection, data=[]){
        this.collection = collection;
        this.data = data;
    }

    /**
     * Generate a random string
     */
    __randomID(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
     * Add a document from the collection
     * @param {{}} data Object containing data
     */
    insertOne(data){
        console.log(this.data);
        this.data.push({id:this.__randomID(), ...data});
    }

    /**
     * Remove a document from the collection
     * @param {function} query use inverse Filter Function to find document
     */
    removeOne(query){ // query is a function
        this.data = this.data.filter(query);
    }

    /**
     * Find a document in the collection
     * @param {function} query Function that returns true or false for a value
     * @returns {{}} Object containing data
    */
    findOne(query){ // query is a function
        return this.data.find(query) || {};
    }
}

export default Database;