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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)