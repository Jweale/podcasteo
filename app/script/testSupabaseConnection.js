import 'dotenv/config';
import { supabase } from '../supabaseClient.js';

// Using 'organisations' table from your schema
const TABLE_NAME = 'organisations';

async function testConnection() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .limit(1);

  if (error) {
    console.error('Connection failed or table not found:', error.message);
    process.exit(1);
  } else {
    console.log('Connection successful! Sample data:', data);
    process.exit(0);
  }
}

testConnection(); 