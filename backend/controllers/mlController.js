import { spawn } from "child_process";
import { error } from "console";
import { writeFileSync, unlinkSync } from 'fs';

/** POST: http://localhost:5001/api/analyze */
/** 
 * @param : {
  "message" : "Hello",
} 
*/
export async function analyzer(req, res) {
  const { message } = req.body;
  try {
    const process = spawn("/usr/src/app/venv/bin/python3", ["/usr/src/app/ml_models/Chatbot/chatbotkb.py", message,]);
    // const process = spawn("python3", ["../backend/ml_models/Chatbot/chatbotkb.py", message,]);

    let result = "";

    // Listen for data events from stdout
    process.stdout.on("data", (data) => {
      result += data.toString();
    });
    // Listen for the 'close' event to handle the completion of the Python script
    process.on("close", (code) => {
      if (code === 0) {
        try {
          console.log(result);
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


/** POST: http://localhost:5001/api/voice-input */
/** 
 * @param : {
  "mood" : "joy",
} 
*/
// Define the controller function to execute the Python script
export async function speech_to_text(req, res) {
  try {
    // let audioData = req.body.audio;
    if (!req.file) {
      return res.status(400).json({ error: "Audio file is required" });
    }

    // req.formData().then((data) => {
    //   console.log("data is came...")
    // })
    // res.send(req.file)
    let audioData = req.file.buffer;
    const tempFilePath = '/usr/src/app/ml_models/temp_audio.wav';
    writeFileSync(tempFilePath, audioData);  // Save the audio data to a temp file
    // console.log("file is created..")
    // writeFileSync(filePath, req.file.buffer);

    // Spawn the Python script as a child process
    const pythonProcess = spawn("/usr/src/app/venv/bin/python3", ["/usr/src/app/ml_models/Chatbot/Voice_GPT3.py", tempFilePath,]);
    // const pythonProcess = spawn("python3", [ "../backend/ml_models/Chatbot/Voice_GPT3.py", tempFilePath]);
    // const pythonProcess = spawn("python3", [ "../backend/ml_models/Chatbot/Voice_GPT3.py", audioData]);

    // // Write the audio data directly to the Python script's stdin
    // pythonProcess.stdin.write(audioData);
    // pythonProcess.stdin.end();

    let output = "";

    // Listen for data events from the Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });


    // Listen for the 'close' event to handle the completion of the Python script
    pythonProcess.on("close", (code, signal) => {
      if (code === 0) {
        try {
          res.send({'result': output})
        } catch (error) {
          res.status(500).json({ error: "Failed to parse JSON response" });
        }
        
        // let jsonObject = JSON.parse(output);

        //   if (jsonObject.hasOwnProperty('result') && jsonObject.result !== null) {
        //       res.status(200).json({ "result": jsonObject.result });
        //   } else {
        //       res.status(400).json({ error: "Result not found in the JSON object." });
        // }
      } else {
        console.log(code)
        res.status(601).send({ error: "Python script exited with an error" });
      }
    });

    // Handle any errors during the execution of the Python script
    pythonProcess.on("error", (error) => {
      res.status(502).json({ error: error.message });
    });



  } catch (error) {
    res.status(503).json({ error: error.message });
  }
}



/** POST: http://localhost:5001/api/emotion_analyzer */
/** 
 * @param : {
  "tweet" : "he has brought flowers to see me",
}
*/

export async function emotion_analyzer(req, res) {
  const { message } = req.body;
  try {
    console.log(message)
    const process = spawn("/usr/src/app/venv/bin/python3", ["/usr/src/app/ml_models/emotion_detection/emotionScript.py", tweet,]);
    // const process = spawn("python3", ["../backend/ml_models/emotion_detection/emotionScript.py", message,]);

    let emotion = ""
    process.stdout.on("data", (data) => {
      emotion = data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        try {
          // const jsonStart = response.lastIndexOf('{');
          // const jsonStr = response.slice(jsonStart);

          // // # Parse the JSON
          // const jsonData = JSON.parse(jsonStr);

          // // # Extract the "emotion" field
          // const emotion = jsonData.emotion;
          const jsonData = JSON.parse(emotion);
          // const joy = jsonData.emotion;
          // console.log(joy);
          // console.log(emotion);
          res.status(200).send(jsonData);
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


/** POST: http://localhost:5001/api/youtube_list */
/** 
 * @param : {
  "categories" : ["Gaming"],
}
*/

export async function youtube_lists(req, res) {
  const { categories } = req.body;
  try {
    // console.log(tweet)
    const process = spawn("/usr/src/app/venv/bin/python3", ["/usr/src/app/ml_models/recommanded_system/youtube_search.py", categories,]);
    // const process = spawn("python3", ["../backend/ml_models/recommanded_system/youtube_search.py", categories,]);

    let youtube_list = ""
    process.stdout.on("data", (data) => {
      youtube_list = data;
    });

    process.on("close", (code) => {
      if (code === 0) {
        try {
          // const jsonStart = response.lastIndexOf('{');
          // const jsonStr = response.slice(jsonStart);

          // // # Parse the JSON
          // const jsonData = JSON.parse(jsonStr);

          // // # Extract the "emotion" field
          // const emotion = jsonData.emotion;
          // const jsonData = JSON.parse(youtube_list);
          // const joy = jsonData.youtube_list;
          // console.log(joy);
          // res.status(200).send(jsonData)
          // Convert the list to a JSON array
          // json_array = json.loads(youtube_list)
          res.status(200).send(youtube_list);
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



/** GET: http://localhost:5001/api/spotify_recommend */
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
    const pythonProcess = spawn("/usr/src/app/venv/bin/python3", ["/usr/src/app/ml_models/spotify_recommendation/spotifyRecommendExecution.py", mood,]);
    // const pythonProcess = spawn("python3", [ "../backend/ml_models/spotify_recommendation/spotifyRecommendExecution.py", mood,]);

    let output = "";
    // let output = [];

    // Listen for data events from the Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      console.log(data.toString())
      output += data.toString();
    });

    // Listen for the 'close' event to handle the completion of the Python script
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          // res.status(200).json(result);
          // const result = JSON.parse(output);  // Parse the output string to JSON
          res.status(200).json(result);
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



