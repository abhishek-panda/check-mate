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

      const prs = result.data.filter((el) => state === 'all' || el.state === state);
      const pr =
          prs.find((el) => {
              return context.payload.ref === `refs/heads/${el.head.ref}`;
          }) || prs[0];

      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pr.number,
        body: `Hello Working finally`
      });
    } catch (error) {
      core.setFailed(error.message);
    }
}
  
run();