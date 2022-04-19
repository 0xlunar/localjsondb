# localjsondb

localjsondb was made because other modules required more than necessary for my use cases

## Installation

Use the package manager [npm](https://www.npmjs.com/package/@lunafr0st/localjsondb) to install foobar.

```bash
npm install @lunafr0st/localjsondb
```

## Usage

```javascript
const Database = require("@lunafr0st/localjsondb");

var db = new Database("./example.json");
db.addCollection("example");

var collection = db.getCollection("example");
collection.insertOne({"hello":"world"});

var data = collection.findOne(x => x.hello == "world");
collection.removeOne(x => x.hello != "world");

db.removeCollection("example");

db.save();
```

## Documentation

> Class Database(fileName)

Base class for module
fileName is type string as the directory where the file is to loaded from and saved to.

> Database.load()

Loads database from fileName in Database constructor

> Database.save()

Saves database to fileName in Database constructor

> Database.addCollection(name)

Add a new Collection Class to the Database
name is type string

> Database.removeCollection(name)

Removes a Collection from the Database
name is type string

> Database.getCollection(name)

Retrieves Collection Class if it exists, otherwise returning null
name is type string
returns Class Collection

> Class Collection(collection<, __data>)

Base class for Collection
collection is type string, the name of the collection
__data is type array, optional and intended for internal usage only, but can be used to pre-insert data

> Collection.insertOne(data)

Insert one document into the collection
document is given a random id on insertion
data is type object{}

> Collection.removeOne(query)

Remove first document in the collection that match query
query is type function, write a function that returns true for a document
returns object{}

> Collection.findOne(query)

Find first document in the collection that match query
query is type function, write a function that returns true for a document
returns object{}

> Collection.insert(data)

Insert many documents into the collection
documents are given a random id on insertion
data is type Array<object> [{}]

> Collection.remove(query)

Remove all documents in the collection that match query
query is type function, write a function that returns true for a document
returns Array<object> [{}]

> Collection.find(query)

Find all documents in the collection that match query
query is type function, write a function that returns true for a document
returns Array<object> [{}]


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)