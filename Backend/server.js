const express = require('express')
const { exec } = require('child_process');
const path = require('path');
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const port = 3000
const tasks = {
    1: 'checkData.js',
    2: 'deleteZaloCache.js',
    3: 'changeFontSize.js',
};
const tasksPath = path.join(__dirname,'tasks');


app.post('/automate', async (req, res) => {
  const { serviceId, arguments: args } = req.body; // Destructure request body
  res.setHeader('Content-Type', 'application/json');
  if (!tasks.hasOwnProperty(serviceId)) {
    return res.status(404).send('No serviceId found!');
  }

  const taskFile = tasks[serviceId];
  const autoTasks = path.join(tasksPath, taskFile);

  exec(`node ${autoTasks} ${args}`, (error, stdout, stderr) => {
    if (error) {
        //console.error(`Error executing Tasks: ${error.message}`);
        // Return an appropriate error status code (e.g., 500 for internal server error)
        res.status(500).send({error: 'Error executing tasks.', data: ""});
        return;
    }
    if (stderr) {
        //console.error(`Task execution error: ${stderr}`);
        // Return an appropriate error status code (e.g., 500 for internal server error)
        res.status(500).send({error:'Error executing task.', data: ""});
        return;
    }
    // Return status code 200 (OK) to indicate success
    res.status(200).send({error: "", data :'Task executed successfully.'});
  });
});
    // console.log(req.body);
    // res.status(200).send(req.body);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});