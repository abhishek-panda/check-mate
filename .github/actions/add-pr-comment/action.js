const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const owner = core.getInput('owner', { required: true });
      const repo = core.getInput('repo', { required: true });
      const token = core.getInput('token', { required: true });
      const sha = core.getInput('sha', { required: true });


      console.log("sha", sha)
      const octokit = new github.getOctokit(token);
  
      console.log(octokit);
      // await octokit.rest.issues.createComment({
      //   owner,
      //   repo,
      //   issue_number: '',
      //   body: `Hello Working finally`
      // });
    } catch (error) {
      core.setFailed(error.message);
    }
}
  
run();

console.log("Working..........")