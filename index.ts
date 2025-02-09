import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";
import { Issue } from "@octokit/types";

async function run() {
  try {
    const token: string = core.getInput("repo-token");
    const daysInactive: number = parseInt(core.getInput("days-inactive"), 10);
    const commentMessage: string = core.getInput("comment-message");

    const octokit = new Octokit({ auth: token });

    const { owner, repo } = github.context.repo;

    const now = new Date();
    const issuesAndPRs = await octokit.issues.listForRepo({
      owner,
      repo,
      state: "open",
      per_page: 100,
    });

    const inactiveIssuesAndPRs = issuesAndPRs.data.filter((issue: Issue) => {
      const lastUpdate = new Date(issue.updated_at);
      const daysDiff =
        (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff >= daysInactive;
    });

    for (const issue of inactiveIssuesAndPRs) {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issue.number,
        body: commentMessage,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred.");
    }
  }
}

run();
