# Location Exporter for Instagram Saved Posts

## Build

You must have installed node (v10.19+ suggested) and npm (v6.14+ suggested).

```npm install -D https://github.com/jameshwc/instagram-private-api/releases/download/1.43.3/instagram-private-api-1.43.3.tgz```

## Run

You must assign your username and password as environment variable (either export them or use .env file) *$IG_USERNAME* and *$IG_PASSWORD*.

**javascript**

```node index.js```

**typescript**

```tsc index.ts && node index.js```