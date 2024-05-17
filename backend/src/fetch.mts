// Fetch updates from github.com

import axios                        from "axios";
import { writeFileSync, mkdirSync } from "fs";
import { config }                   from "dotenv";

import formatTime             from "./datetime.mjs";
import { format, replaceLinks }                from "./process-md.mjs";
import 
{ 
  replaceReservedCharacters, 
  errorText, 
  successText 
}                             from "./text.mjs";

if (process.env.NODE_ENV != "production")
{
  config ();
};

// Testing purposes only
const TEST_DIRECTORY: string = "dev-local/api-test-requests";
const CONTENT_ROOT:   string = "frontend/public/content";
const DEBUG:          boolean = true;

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const authorizations = ["Bearer", "Basic"];
const contentTypes = 
  {
    urlencoded: "application/x-www-form-urlencoded",
    json:       "application/json",
    jpeg:       "image/jpeg"
  };

const token: string = process.env.GITHUB_AUTH_TOKEN!;


async function fetch (url: string)
{
  const method = "GET";
  const data   = null;
  const auth   = "Bearer";
  const type   = "application/x-www-form-urlencoded";

  const options = {

    method: method,
    url: url,
    headers: {
        "Content-Type": type,
        Authorization: `${auth} ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    },

    data: data,

    // Silence axios error responses
    validateStatus: function (status: any) { return DEBUG ? (status >= 200 && status < 300) : true }

  };

  const request = await axios (options);

  if (request.status != 200)
  {
    console.error (errorText (`Fetch Unsuccessful (response code ${request.status})`));
    return false;
  };

  // console.log (successText (`Fetch Successful (response code ${request.status})`));
  return request;
}

async function fetchReadme (repository: string, write: boolean = true)
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/readme`);

  if (!request) return;

  const README: string = Buffer.from (request.data.content, 'base64').toString ('utf8');
  
  if (write)
    mkdirSync     (`${TEST_DIRECTORY}/repos/${repository}`, {recursive: true});
    writeFileSync (`${TEST_DIRECTORY}/repos/${repository}/README.md`, README);

  return format (README);
};

async function fetchRepositories (write: boolean = false)
{
  const request = await fetch ("https://api.github.com/users/midenda/repos?sort=pushed");

  if (!request) return;

  const repositories = request.data.map ((item: any) => 
    ({
      name:        item.name,
      description: item.description,
      id:          item.id,
      url:         item.html_url,
      language:    item.language,
      meta:        undefined,
      readme:      undefined,
      image:       undefined,
      commits:     undefined,
      latest:      undefined
    })
  );

  if (write)
    writeFileSync (`${TEST_DIRECTORY}/Repositories.json`, JSON.stringify (repositories));

  return repositories;
};

async function fetchCommits (repository: string, write: boolean = false)
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/commits`);

  if (!request) return;

  const commits = request.data.map ((item: any) => 
    ({
      sha:     item.sha,
      date:    formatTime (item.commit.author.date),
      message: item.commit.message,
      url:     item.url
    })
  );

  if (write)
  {
    mkdirSync     (`${TEST_DIRECTORY}/repos/${repository}`, {recursive: true});
    writeFileSync (`${TEST_DIRECTORY}/repos/${repository}/Commits.json`, JSON.stringify (commits));
  };

  return commits;
}

async function fetchACommit (repository: string, reference: string = "heads/main", write: boolean = false)
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/commits/${reference}`);

  if (!request) return;
  
  const sha: string = request.data.sha;

  const commit = 
  {
    sha:     request.data.sha,
    date:    formatTime (request.data.commit.author.date),
    message: request.data.commit.message,
    stats:   request.data.stats,
    changes: request.data.files.map ((file: any) => 
      ({
        name: file.filename,
        stats: 
        {
          total:     file.changes, 
          additions: file.additions, 
          deletions: file.deletions
        },
        patch: file.patch
      })
    )
  };

  if (write) 
  {  
    mkdirSync     (`${TEST_DIRECTORY}/repos/${repository}/commits`, {recursive: true});
    writeFileSync (`${TEST_DIRECTORY}/repos/${repository}/commits/${sha}.json`, JSON.stringify (commit));
  };

  return commit;
}

async function fetchPathContents (repository: string, path: string, write: boolean = false)
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/contents/${path}`);

  if (!request) return;

  const isFile: boolean = !(request.data.constructor === Array);

  let contents:  any;
  let directory: string;
  let filename:  string;

  if (isFile)
  {
    contents = 
    {
      name:    request.data.name,
      path:    request.data.path,
      type:    request.data.type,
      content: Buffer.from (request.data.content, "base64").toString ("utf8")
    };

    directory = path.split ("/").slice (0, -1).join ("/");
    filename  = `${contents.name}.json`;
  }
  else
  {
    contents = request.data.map ((item: any) => 
      ({
        name:    item.name,
        path:    item.path,
        type:    item.type,
        content: undefined
      })
    );

    directory = path;
    filename  = "directory-index.json";
  };

  if (write)
  {
    mkdirSync     (`${TEST_DIRECTORY}/repos/${repository}/contents/${directory}`);
    writeFileSync (`${TEST_DIRECTORY}/repos/${repository}/contents/${directory}/${filename}`, JSON.stringify (contents));
  };
  
  return contents;
}

// Additions and deletions per week
async function fetchWeeklyCodeFrequency (repository: string, write: boolean = false) 
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/stats/code_frequency`);

  if (!request) return;

  const activity = request.data;

  return activity;
}

// Commits each day per week in the last year
async function fetchCommitActivity (repository: string, write: boolean = false)
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/stats/commit_activity`);

  if (!request) return;

  const activity = request.data;

  return activity;
}

async function fetchWorkflows (repository: string, write: boolean = false)
{
  const request = await fetch (`https://api.github.com/repos/midenda/${repository}/actions/runs`);

  if (!request) return;

  const workflow = request.data.workflow_runs [0];

  const run = 
  {
    name:  workflow.name,
    path:  workflow.path,
    event: workflow.event,
    title: workflow.display_title
  };

  if (write)
  {
    mkdirSync     (`${TEST_DIRECTORY}/repos/${repository}/actions/runs`, {recursive: true});
    writeFileSync (`${TEST_DIRECTORY}/repos/${repository}/actions/runs/${run.name}`, JSON.stringify (run));
  };

  return run;
}

async function fetchCodePreview (repository: string, path: string, write: boolean = false) 
{
  const file = await fetchPathContents (repository, path, false);

  if (!file) 
  {
    console.error (errorText ("fetchCodePreview failed (empty response)"));
    return;
  };

  const lines = file.content.split ("\n");

  let linewidth = 0;
  for (const line of lines)
  {
    if (linewidth < line.length)
      linewidth = line.length;
  };

  const preview = 
  {
    name:    file.name,
    caption: `Preview of ${file.path}`, //TODO: Improve preview caption generation
    content: replaceReservedCharacters (file.content), //TODO: Search through file for content
    lines:   lines.length || 100,
    width:   linewidth
  };

  if (write)
    writeFileSync (`${CONTENT_ROOT}/${repository}-preview.js`, `export default ${ JSON.stringify (preview) };`);

  console.log (successText ("Successfully fetched code previews"));
}

async function fetchMeta (repository: string, write: boolean = false) 
{
  // const meta = await fetchPathContents (repository, ".meta", false); //TODO: add .meta file to repositories

  const meta = {
    portfolio:              
    {
      preview: "backend/src/fetch.mts"
    },

    ml:                     
    {
      preview: "ml.h"
    },

    Curator:                
    {
      preview: "request.js"
    },

    "verglas-color-theme":  
    {
      preview: "themes/Verglas-color-theme.json"
    }
  };

  // if (write)
  // {
  //   mkdirSync     (`${TEST_DIRECTORY}/repos/${repository}`, { recursive: true });
  //   writeFileSync (`${TEST_DIRECTORY}/repos/${repository}/.meta`, meta );
  // };

  for (let repo in meta)
    if (repo == repository) return meta [repo as keyof typeof meta];

  return false;

  // return JSON.parse (meta);
};

async function fetchShowcase (write: boolean = false)
{
  let repositories = await fetchRepositories ();

  if (!repositories) 
  {
    console.error (errorText ("fetchShowcase failed (empty response)"));
    return;
  };

  for (let repository of repositories)
  {
    repository.commits = await fetchCommits (repository.name);
    repository.latest  = await fetchACommit (repository.name, repository.commits [0].sha);
    repository.readme  = await fetchReadme  (repository.name);
    repository.meta    = await fetchMeta    (repository.name);

    await fetchCodePreview (repository.name, repository.meta.preview, true);
  };

  if (write)
  {
    writeFileSync (`${CONTENT_ROOT}/Repositories.js`, `export default ${ JSON.stringify (repositories) };`);
    writeFileSync (`${CONTENT_ROOT}/Repositories.d.ts`, "export declare module 'Repositories';");
  };

  console.log (successText ("Successfully fetched showcase"));
}

fetchShowcase (true);
// fetchReadme ("portfolio", false);