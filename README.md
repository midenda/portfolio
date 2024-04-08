# Portfolio

This is the repository for my portfolio website, which can be found [here](https://www.midenda.com/ "midenda.com").

## Tech Stack

* [IONOS](https://www.ionos.co.uk/ "IONOS") for domain hosting.
* [AWS](https://aws.amazon.com/ "Amazon Web Services") 
  * [EC2](https://aws.amazon.com/ec2/ "AWS Elastic Compute Cloud") instances running an [Apache](https://httpd.apache.org/ "Apache") reverse proxy.
  * [ECS](https://aws.amazon.com/ecs/ "AWS Elastic Container Service") to manage container distribution.
  * [S3](https://aws.amazon.com/s3/ "AWS Simple Storage Service"), [ECR](https://aws.amazon.com/ecr/ "AWS Elastic Container Registry") for file object and Docker image storage respectively.
* [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet "ASP .NET") for handling backend server routing.
* [React](https://react.dev/ "React")
  * Frontend written in [Typescript](https://www.typescriptlang.org/ "Typescript"), transpiled using [Babel](https://babeljs.io/ "Babel"), and bundled using [webpack](https://webpack.js.org/ "Webpack").
* [Docker](https://www.docker.com/ "Docker") to containerise web app for deployment.
* [Node.js](https://nodejs.org/en "Node.js") to fetch up to date content from the [GitHub API](https://docs.github.com/en/rest "GitHub API").
* [GitHub Actions](https://github.com/features/actions "GitHub Actions") to automate build / deploy pipeline.