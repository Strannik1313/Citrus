import app from './app.js';
import { config } from './config/config.js';

app.listen(config.port, () => {
  console.log(`Server has been started on ${config.port}`);
});
