import { spawn } from "child_process";
import { error } from "console";

/** POST: http://localhost:3000/api/analyze */
/** 
 * @param : {
  "message" : "Hello",
} 
*/
export async function analyzer(req, res) {
  const { message } = req.body;
  try {
    const process = spawn("python3", ["../ml_models/Chatbot/chatbotkb.py", message,]);

    let result = "";

    // Listen for data events from stdout
    process.stdout.on("data", (data) => {
      result += data.toString();
    });

    // Listen for the 'close' event to handle the completion of the Python script
    process.on("close", (code) => {
      if (code === 0) {
        try {
          // const jsonString = {"result": result}
          // const response = JSON.parse(result);
          res.status(200).send(result);
        } catch (error) {
          res.status(500).json({ error: "Failed to parse JSON response" });
        }
      } else {
        res.status(500).json({ error: "Python script exited with an error" });
      }
    });

    // Handle any errors during the execution of the Python script
    process.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function emotion_analyzer(req, res) {
  const { message } = req.body;
  try {
    const process = spawn("python3", ["../ml_models/emotion_detection/emotionScript.py", message,]);
    process.stdout.on("data", (data) => {
      let emotion = data.toString();
    });
    process.on("close", (code) => {
      if (code === 0) {
        try {
          res.status(200).send(emotion);
        } catch (error) {
          res.status(500).json({ error: "Failed to parse JSON response" });
        }
      } else {
        res.status(500).json({ error: "Python script exited with an error" });
      }
    });
    process.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/** GET: http://localhost:3000/api/youtube_videos */
/** 
 * @param : {
  "mood" : "Happiness",
} 
*/
// Define the controller function to execute the Python script
export async function video_predict(req, res) {
  try {
    const { mood } = req.body;

    // Spawn the Python script as a child process
    const pythonProcess = spawn("python3", ["../ml_models/recommanded_system/combinedScript.py",mood,]);

    let output = "";

    // Listen for data events from the Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Listen for the 'close' event to handle the completion of the Python script
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: "Failed to parse JSON response" });
        }
      } else {
        res.status(500).json({ error: "Python script exited with an error" });
      }
    });

    // Handle any errors during the execution of the Python script
    pythonProcess.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// // Define the controller function to execute the Python script
// export async function break_time(req, res) {
//   try {
//     const { mood } = req.body;

//     // Spawn the Python script as a child process
//     const pythonProcess = spawn('python3', ['/Volumes/Transcend/Development/Depresio/backend/ml_models/recommanded_system/combinedScript.py', mood]);

//     let output = '';

//     // Listen for data events from the Python script's stdout
//     pythonProcess.stdout.on('data', (data) => {
//       output += data.toString();
//     });

//     // Listen for the 'close' event to handle the completion of the Python script
//     pythonProcess.on('close', (code) => {
//       if (code === 0) {
//         try {
//           const result = JSON.parse(output);
//           res.status(200).json(result);
//         } catch (error) {
//           res.status(500).json({ error: 'Failed to parse JSON response' });
//         }
//       } else {
//         res.status(500).json({ error: 'Python script exited with an error' });
//       }
//     });

//     // Handle any errors during the execution of the Python script
//     pythonProcess.on('error', (error) => {
//       res.status(500).json({ error: error.message });
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

/*
    @vihidun
    Make sure this code segment work. Coudn't test as the backend and frontend are not working properly
*/

/** GET: http://localhost:3000/api/spotify_recommend */
/** 
 * @param : {
  "mood" : "joy",
} 
*/
// Define the controller function to execute the Python script
export async function spotify_recommend(req, res) {
  try {
    const { mood } = req.body;

    // Spawn the Python script as a child process
    const pythonProcess = spawn("python3", [ "../ml_models/Spotify_Recommendation/spotifyRecommendExecution.py", mood,]);

    let output = "";

    // Listen for data events from the Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Listen for the 'close' event to handle the completion of the Python script
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          // const result = JSON.parse(output);
          // res.status(200).json(result);
          const result = JSON.parse(output);  // Parse the output string to JSON
          res.status(200).json({"result": result});
          // res.status(200).json({"result":output});
        } catch (error) {
          res.status(500).json({ error: "Failed to parse JSON response" });
        }
      } else {
        res.status(500).json({ error: "Python script exited with an error" });
      }
    });

    // Handle any errors during the execution of the Python script
    pythonProcess.on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
