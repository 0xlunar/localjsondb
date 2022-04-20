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

    __query(query){
        return this.data.filter(doc => {
            for (var key in query){
                if (doc[key] != query[key]) return false;
            }
            return true;
        });
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
     * @param {{}} query Object with key:value pairs to match
     * @returns {{}} Removed document
     */
    removeOne(query){ // query is a function
        var elementToRemove = this.__query(query)[0];
        this.data = this.data.filter(doc => doc != elementToRemove);
        return elementToRemove;
    }

    /**
     * Find first document in the collection from query
     * @param {{}} query Object with key:value pairs to match
     * @returns {{}} Object containing data
    */
    findOne(query){ // query is a function
        return this.__query(query)[0] || {};
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
     * @param {{}} query Object with key:value pairs to match
     * @returns {[]} Array of documents removed
    */
    remove(query){
        var elementsToRemove = this.__query(query);
        this.data = this.data.filter(doc => !elementsToRemove.includes(doc));
        return elementsToRemove;
    }

    /**
     * Find many documents in the collection
     * @param {{}} query Object with key:value pairs to match
     * @returns {[]} Array of documents found
    */
    find(query){
        return this.__query(query);
    }

    /**
     * Remove first document from the collection matching query
     * @param {{}} query Object with key:value pairs to match
     * @returns {{}} Object of document removed
    */
    removeID(id){
        var elementToRemove = this.__query({ __id: id })[0];
        this.data = this.data.filter(doc => elementToRemove != doc);
        return elementToRemove;
    }

    /**
     * Find many documents in the collection
     * @param {{}} query Object with key:value pairs to match
     * @returns {[]} Array of documents found
    */
    findID(id){
        return this.__query({ __id: id });
    }


    /**
     * Update first document in the collection matching query
     * @param {{}} query Object with key:value pairs to match
     * @param {{}} data Object with key:value pairs to update
     * @returns {{}} Object of document updated
     */
    updateOne(query, data){
        var elementToUpdate = this.__query(query)[0];
        var index = this.data.indexOf(elementToUpdate);
        this.data[index] = {...elementToUpdate, ...data};
        return this.data[index];
    }

    /**
     * Update Many documents in the collection
     * @param {{}} query Object with key:value pairs to match
     * @param {[{}]} data Object Array with key:value pairs to update
     * @returns {[]} Array of documents updated
     */
    update(query, data){
        var elementsToUpdate = this.__query(query);
        var updatedElements = []
        this.data.forEach((doc, index) => {
            if (elementsToUpdate.includes(doc)){
                this.data[index] = {...doc, ...data};
                updatedElements.push(this.data[index]);
            }
        });
        return updatedElements;
    }

    /**
     * Update document in the collection matching ID
     * @param {string} id ID to match __id of document
     * @param {{}} data Object with key:value pairs to update
     * @returns {{}} Object of document updated
     */
    updateID(id, data){
        var elementToUpdate = this.__query({ __id: id })[0];
        var index = this.data.indexOf(elementToUpdate);
        this.data[index] = {...elementToUpdate, ...data};
        return this.data[index];
    }
}

module.exports = Database;