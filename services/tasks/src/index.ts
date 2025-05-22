import app from './app';

const port = 2222;

app.listen(port, () => {
  console.log(`Task service is running on port ${port}`);
});
