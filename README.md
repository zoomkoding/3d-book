# 3d-book

**3d-book** is a [React](https://reactjs.org/) book component created by [three.js](https://threejs.org/).

## Installation

3d-book is available as an [npm package](https://www.npmjs.com/package/3d-book).

```bash
npm install 3d-book
```

## Usage

```js
import Book from "3d-book";

function App() {
  return (
    <div className="App">
      <Book
        style={{ width: 500, height: 600, background: "white" }}
        bookCovers={{
          front: "/images/front.jpeg",
          back: "/images/back.jpeg",
          spine: "/images/spine.jpeg",
        }}
      />
      <h2>
        <a href="https://github.com/zoomKoding/3d-book">3d book</a> by{" "}
        <a href="https://threejs.org/">three.js</a>
      </h2>
      <strong>Hover your mouse to rotate the book.</strong>
    </div>
  );
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
