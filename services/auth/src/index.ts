import app from './app';

const port = 1111;

app.listen(port, '0.0.0.0', () => {
  console.log(`Auth service is running on port ${port}`);
});
