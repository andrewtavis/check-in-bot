<div align="center">
  <a href="https://github.com/andrewtavis/check-in-bot"><img src="https://raw.githubusercontent.com/andrewtavis/check-in-bot/main/.github/resources/CheckInBotkGitHubBanner.png" width=1024 alt="Check in Bot logo"></a>
</div>

[![issues](https://img.shields.io/github/issues/andrewtavis/check-in-bot?label=%20&logo=github)](https://github.com/andrewtavis/check-in-bot/issues)
[![license](https://img.shields.io/github/license/andrewtavis/check-in-bot.svg?label=%20)](https://github.com/andrewtavis/check-in-bot/blob/main/LICENSE.txt)
[![coc](https://img.shields.io/badge/Contributor%20Covenant-ff69b4.svg)](https://github.com/andrewtavis/check-in-bot/blob/main/.github/CODE_OF_CONDUCT.md)

### A friendly bot to check in on issues and pull requests

`Check in Bot` is a simple GitHub Action to send automated messages to inactive issues and pull requests. It does not and will never do the following:

- Add labels to issues and pull requests
- Close issues and pull requests

By default this action sends the following message to issues and pull requests that are inactive for 14 or more days:

> Hello to the maintainers and watchers!
>
> There have been no updates here for the last two weeks. There might be need for a check in :)
>
> Thanks and hope all are well! ❤️

The default message is meant to remind the community around a project that there may be need to assist a new contributor, communicate that a review is taking some time and overall to facilitate communication between people who may have forgotten about something or need help.

## Example Config

`Check in Bot` can be added to repositories using the following YAML template.

```yaml
# check_in_bot.yaml
name: Check in on Issues and PRs

on:
  schedule:
    - cron: "0 0 * * *" # daily at midnight

jobs:
  check-in-bot:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Check in on issues and PRs
        uses: andrewtavis/check-in-bot@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          days-inactive: 14
          comment-message: |
            Hello to the maintainers and watchers!

            There have been no updates here for the last two weeks. There might be need for a check in :)

            Thanks and hope all are well! ❤️
```

## Contributors

Thanks to all our amazing [contributors](https://github.com/andrewtavis/check-in-bot/graphs/contributors)! ❤️

<a href="https://github.com/andrewtavis/check-in-bot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=andrewtavis/check-in-bot" />
</a>

Happy community building!
