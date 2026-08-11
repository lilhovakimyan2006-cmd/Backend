## 1.
In this case, we assign an object to the `exports` variable. As we know, `exports` is a reference that points to the `module.exports` object, but here we assign it to another object. So, when we require it from `index.js`, Node.js looks at `module.exports`, which is still an empty object because we changed where `exports` points.

## 2.
We can use both approaches; the main difference is how we use `require()` when importing the module. If we write `math.js` using `module.exports`, we can export all three functions as one object and require it as an object. If we use `exports.xxx = ...`, we attach each function to the same `module.exports` object, so we can also require it as an object. However, if we assign a new object directly to `exports`, it only changes the reference of `exports` and does not change `module.exports`.

## 3.
The difference is that CJS is more flexible and can find the file without the `.js` extension. ESM cannot do this, so we must provide the exact file path, including the `.js` extension.

## 4.
ESM can work asynchronously because `import()` returns a Promise. While the module is being imported, ESM can continue running other code. CJS works synchronously, so it has to wait until `require()` finishes before continuing the code.