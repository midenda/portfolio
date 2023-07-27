FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-dotnet

WORKDIR /backend/server/

COPY backend/server/server.csproj .
COPY backend/server/Directory.Build.props .

RUN dotnet restore

COPY backend/server/ .

RUN dotnet publish -c Release -o /publish



FROM node:18 AS build-node

WORKDIR /

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run --prefix ./ build



FROM mcr.microsoft.com/dotnet/aspnet:7.0 as runtime

WORKDIR /

COPY --from=build-dotnet /publish .
COPY /frontend/public/ ./frontend/public

EXPOSE 3000
ENTRYPOINT [ "dotnet", "server.dll" ]


# FROM nginx:alpine

# COPY --from=build /frontend/public /usr/share/nginx/html

# CMD ["sh", ". ./run"]
