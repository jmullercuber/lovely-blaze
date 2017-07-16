Open mongo shell

```bash
ssh lovely@joeymuller.me
mongo
```

Type the script

```js
use lovely

db.recipes.find().snapshot().forEach(
  function (r) {
    // update document, using its own properties
    r.datePublished.setHours( r.datePublished.getHours()+8 );
    print("Updated", r.datePublished, "for", r.name);
    // save the updated document
    db.recipes.save(r);
  }
);
```