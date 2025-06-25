import { connect } from 'mongoose';
import 'dotenv/config.js';
const DATABASE = process.env.DATABASE_URI;
if (!DATABASE) {
  console.error('DATABASE_URI is not defined in the environment variables.');
  process.exit(1); // Exit with failure code
}
const connection = async () => {
  try {
    await connect(DATABASE, {
      family: 4,                // use IPv4
    });
    console.log('Database connected successfully...!');
  } catch (error) {
    console.error('Cannot connect to the database!', error);
    process.exit(1); // Exit with failure code
  }
};
export { connection };


