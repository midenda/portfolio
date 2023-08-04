ARG VERSION_NODE=18.17.0
ARG VERSION_DOTNET=7.0


# FROM amazonlinux:latest AS base

# ENV VERSION_NODE=18.17.0

# WORKDIR /aws-dependencies

# # Install Curl, Git, OpenSSL (AWS Amplify requirements) and tar (required to install hugo)
# RUN touch /.bashrc
# RUN yum -y update && \
#     yum -y --allowerasing install \
#     curl \
#     git \
#     openssl \
#     openssh-clients \
#     tar && \
#     yum clean all && \
#     rm -rf /var/cache/yum

# # Install Node (AWS Amplify requirement)
# RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.4/install.sh | bash
# RUN /bin/bash -c ". ~/.nvm/nvm.sh && \
#     nvm install $VERSION_NODE && nvm use $VERSION_NODE && \
#     nvm alias default node && nvm cache clear"

# # Configure environment
# RUN echo export PATH="\
#     /root/.nvm/versions/node/${VERSION_NODE}/bin:\
#     $PATH" >> /aws-dependencies/.bashrc && \
#     echo "nvm use ${VERSION_NODE} 1> /dev/null" >> /aws-dependencies/.bashrc


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



# FROM mcr.microsoft.com/dotnet/aspnet:$VERSION_DOTNET as runtime
FROM amazonlinux:latest AS runtime

WORKDIR /

ENV VERSION_NODE=18.17.0

# Install Curl, Git, OpenSSL (AWS Amplify requirements) and tar (required to install hugo)
RUN touch /.bashrc
RUN yum -y update && \
    yum -y --allowerasing install \
    findutils \
    curl \
    git \
    openssl \
    openssh-clients \
    tar && \
    yum clean all && \
    rm -rf /var/cache/yum

# Install Node (AWS Amplify requirement)
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.4/install.sh | bash
RUN /bin/bash -c ". ~/.nvm/nvm.sh && \
    nvm install $VERSION_NODE && nvm use $VERSION_NODE && \
    nvm alias default node && nvm cache clear"

# Configure environment
RUN echo export PATH="\
    /root/.nvm/versions/node/${VERSION_NODE}/bin:\
    $PATH" >> /.bashrc && \
    echo "nvm use ${VERSION_NODE} 1> /dev/null" >> /.bashrc

RUN curl -o dotnet-install.sh https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh

RUN chmod +x ./dotnet-install.sh

RUN ./dotnet-install.sh --channel 7.0 --runtime aspnetcore



# COPY --from=base /.bashrc .
# COPY --from=base /aws-dependencies /aws-
COPY --from=build-dotnet /publish .
COPY --from=build-node /frontend/public/ ./frontend/public

# RUN ["curl", "-v"]

ENTRYPOINT [ "dotnet", "server.dll" ]