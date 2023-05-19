const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
      const owner = core.getInput('owner', { required: true });
      const state = (core.getInput('state', { required: false }) || 'open').toLowerCase();
      const repo = core.getInput('repo', { required: true });
      const token = core.getInput('token', { required: true });
      const sha = core.getInput('sha', { required: true });


      const octokit = new github.getOctokit(token);

      const context = github.context;
      const result = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
          owner: context.repo.owner,
          repo: context.repo.repo,
          commit_sha: sha,
      });
  

      const issue_number = context.payload.pull_request?.number || context.payload.issue?.number;

      console.log("issue_number", issue_number);
      console.log(JSON.stringify(github.context));
      const prs = result.data.filter((el) => state === 'all' || el.state === state);
      const pr =
          prs.find((el) => {
              return context.payload.ref === `refs/heads/${el.head.ref}`;
          }) || prs[0];
  
      // console.log(pr);
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