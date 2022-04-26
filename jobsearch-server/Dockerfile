FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
WORKDIR /app
EXPOSE 1233
EXPOSE 1234

ENV ASPNETCORE_URLS=http://+:1233

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY ["jobsearch-server.csproj", "./"]
RUN dotnet restore "jobsearch-server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "jobsearch-server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "jobsearch-server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "jobsearch-server.dll"]
