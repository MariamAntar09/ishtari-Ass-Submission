const app = require("./app");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//$TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0ZXIiLCJpYXQiOjE3ODUwMjEyNzZ9.ME5dGA-kTCdKFHzXwnSaiJYUgAlrJJFQNTjT28R2G5U"