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
        if (!this.data[name]) return null;
        this.data[name] = new Collection(name, this.data[name].data);
        return this.data[name];
    }

}

class Collection {
    constructor(collection, __data=[]){
        this.collection = collection;
        this.data = __data;
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
        this.data.push({__id:this.__randomID(), ...data});
    }

    /**
     * Remove first document in the collection from query
     * @param {function} query Function that returns true or false for a value
     * @returns {{}} Removed document
     */
    removeOne(query){ // query is a function
        var elementToRemove = this.data.filter(query)[0];
        this.data = this.data.filter(doc => doc != elementToRemove);
        return elementToRemove;
    }

    /**
     * Find first document in the collection from query
     * @param {function} query Function that returns true or false for a value
     * @returns {{}} Object containing data
    */
    findOne(query){ // query is a function
        return this.data.find(query) || {};
    }

    /**
     * insert many documents to the collection
     * @param {[]} data Array of Objects containing data
    */
    insert(data){
        data.forEach(doc => this.data.push({__id:this.__randomID(), ...doc}));
    }

    /**
     * Remove many documents from the collection 
     * @param {function} query Function that returns true or false for a value
     * @returns {[]} Array of documents removed
    */
    remove(query){
        var elementsToRemove = this.data.filter(query);
        this.data = this.data.filter(doc => !elementsToRemove.includes(doc));
        return elementsToRemove;
    }

    /**
     * Find many documents in the collection
     * @param {function} query Function that returns true or false for a value
     * @returns {[]} Array of documents found
    */
    find(query){
        return this.data.filter(query);
    }
}

module.exports = Database;