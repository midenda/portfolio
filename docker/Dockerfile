ARG VERSION_NODE=18.17.0
ARG VERSION_DOTNET=7.0
ARG VERSION_NVM=v0.39.4

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

WORKDIR /

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run --prefix ./ build


# Configure runtime environment
FROM amazonlinux:latest AS runtime

SHELL ["/bin/bash", "--login", "-c"]

WORKDIR /

ENV VERSION_NODE=18.17.0
ENV ASPNETCORE_URLS=http://+:3001

# Install Curl, Git, OpenSSL (AWS Amplify requirements) and tar (required to install hugo)
RUN touch /.bashrc
RUN yum -y update && \
    yum -y --allowerasing install \
    findutils \
    curl \
    git \
    openssl \
    openssh-clients \
    libicu \
    tar && \
    yum clean all && \
    rm -rf /var/cache/yum

# Switch to interactive mode shell for installs
SHELL ["/bin/bash", "--login", "-i", "-c"]

# Install Node (AWS Amplify requirement)
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/${VERSION_NVM}/install.sh | bash
RUN . ~/.nvm/nvm.sh && \
    nvm install $VERSION_NODE && nvm use $VERSION_NODE && \
    nvm alias default node && nvm cache clear

# Install .NET 
RUN curl -o dotnet-install.sh https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh
RUN chmod +x ./dotnet-install.sh
RUN ./dotnet-install.sh --channel 7.0 --runtime aspnetcore

# Switch back to non-interactive shell
SHELL ["/bin/bash", "--login", "-c"]

COPY --from=build-dotnet /publish /server
COPY --from=build-node /frontend/public/ ./frontend/public

EXPOSE 3000
EXPOSE 3001

ENTRYPOINT [ "/root/.dotnet/dotnet", "server/server.dll" ]