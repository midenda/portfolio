ARG VERSION_NODE=22.14.0
ARG VERSION_NVM=v0.40.1
ARG VERSION_DOTNET=8.0

# Build and publish dotnet backend
FROM mcr.microsoft.com/dotnet/sdk:$VERSION_DOTNET AS build-dotnet

WORKDIR /backend/server/

COPY backend/server/server.csproj .
COPY backend/server/Directory.Build.props .

RUN dotnet restore

COPY backend/server/ .

RUN dotnet publish -c Release -o /publish


# Install and build relevant npm packages
FROM node:$VERSION_NODE AS build-node

ARG COMMIT_SHA

WORKDIR /

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN --mount=type=secret,id=token GITHUB_AUTH_TOKEN=$(cat /run/secrets/token) \
npm run --prefix ./ build


# Configure runtime environment
FROM amazonlinux:latest AS runtime

ARG VERSION_NODE
ARG VERSION_NVM
ARG VERSION_DOTNET

ENV VERSION_NODE=$VERSION_NODE
ENV VERSION_NVM=$VERSION_NVM
ENV VERSION_DOTNET=$VERSION_DOTNET

SHELL ["/bin/bash", "--login", "-c"]

WORKDIR /

# Install Curl, Git, .NET and other dependencies
RUN touch /.bashrc
RUN yum -y update && \
    yum -y --allowerasing install \
    aspnetcore-runtime-${VERSION_DOTNET} \
    curl \
    findutils \
    git \
    libicu \
    openssh-clients \
    openssl \
    tar && \
    yum clean all && \
    rm -rf /var/cache/yum

# Switch to interactive mode shell for installs
SHELL ["/bin/bash", "--login", "-i", "-c"]


# Install Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${VERSION_NVM}/install.sh | bash
RUN . ~/.nvm/nvm.sh && \
    nvm install $VERSION_NODE && nvm use $VERSION_NODE && \
    nvm alias default node && nvm cache clear

# Switch back to non-interactive shell
SHELL ["/bin/bash", "--login", "-c"]

COPY --from=build-dotnet /publish /server
COPY --from=build-node /frontend/public/ ./frontend/public


EXPOSE 3001
EXPOSE 3000

ENTRYPOINT [ "dotnet", "server/server.dll" ]