const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const owner = core.getInput('owner', { required: true });
      const repo = core.getInput('repo', { required: true });
      const pr_number = core.getInput('pr_number') || '';
      const token = core.getInput('token', { required: true });
  
      const octokit = new github.getOctokit(token);
  
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pr_number,
        body: `Hello Working finally`
      });
    } catch (error) {
      core.setFailed(error.message);
    }
}
  
run();