// Fetch updates from github.com

import axios             from "axios";
import { writeFileSync } from "fs";

require ("dotenv").config ();

// Testing purposes only
// const outfile: string = "frontend/public/content/RequestOutput.json";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const authorizations = ["Bearer", "Basic"];
const contentTypes = {
    urlencoded: "application/x-www-form-urlencoded",
    json:       "application/json",
    jpeg:       "image/jpeg"
};

const urls = 
{
  GetCommits:      "https://api.github.com/repos/midenda/ml/commits",
  GetRepositories: "https://api.github.com/users/midenda/repos?sort=pushed"
};

const token = process.env.TOKEN;

async function fetchRepositories ()
{
  const method = "GET";
  const data   = null;
  const auth   = "Bearer";
  const type   = "urlencoded";

  const options = {

    method: method,
    url: urls.GetRepositories,
    headers: {
        "Content-Type": contentTypes[type],
        Authorization: `${auth} ${token}`,
        Accept: "application/vnd.github+json"
    },

    data: data

  };

  const request = await axios (options);

  if (request.status == 200)
    console.log (`\n\x1b[32mSuccessfully fetched repositories with response code ${request.status}\x1b[0m\n`);
  else
    console.error (`\n\x1b[31mFailed to fetch repositories with response code ${request.status}\x1b[0m\n`);

  writeFileSync (
    "frontend/public/content/Repositories.json", 
    JSON.stringify 
    (
      request.data.map ((item: any) => 
        ({
          name:        item.name,
          description: item.description,
          id:          item.id,
          url:         item.html_url,
          language:    item.language,
          image:       undefined
        })
      )
    )
  );
};

fetchRepositories ();