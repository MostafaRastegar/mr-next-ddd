// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
