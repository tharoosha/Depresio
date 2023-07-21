import { spawn } from 'child_process';

/** POST: http://localhost:3000/api/analyze */
/** 
 * @param : {
  "message" : "Hello",
} 
*/



export async function analyzer(req, res) {
  const { message } = req.body;
  try {
    const process = spawn('python3', ['/Volumes/Transcend/Development/Depresio/ml_models/Chatbot/chatbotkb.py', message]);

    let result = '';

    // Listen for data events from stdout
    process.stdout.on('data', (data) => {
      result += data.toString();
    });

    // Listen for the 'close' event to handle the completion of the Python script
    process.on('close', (code) => {
      if (code === 0) {
        try {
          // const jsonString = {"result": result}
          // const response = JSON.parse(result);
          res.status(200).send(result);
        } catch (error) {
          res.status(500).json({ error: 'Failed to parse JSON response' });
        }
      } else {
        res.status(500).json({ error: 'Python script exited with an error' });
      }
    });

    // Handle any errors during the execution of the Python script
    process.on('error', (error) => {
      res.status(500).json({ error: error.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
