const core = require('@actions/core');

try {
  const input1 = core.getInput('input1');
  const input2 = core.getInput('input2');

  // JavaScript code for your custom action
  console.log(`Input 1: ${input1}`);
  console.log(`Input 2: ${input2 || 'Not provided'}`);

  // Additional actions based on your requirements

  core.setOutput('output', 'Action completed successfully');
} catch (error) {
  core.setFailed(error.message);
}