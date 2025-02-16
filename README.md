# Social Network Frontend

## Project Initialization

In the project folder, run:

```shell
npm install
```

## Start the Backend

The backend for this application is available at [socialnetwork_backend](https://github.com/DorianTrn2/socialnetwork_backend). To start the backend, clone the Git repository:

```shell
git clone https://github.com/DorianTrn2/socialnetwork_backend.git
```

### Using Docker

If you have Docker installed, run the following command in the root of the project folder:

```shell
docker compose up
```

### Without Docker

Refer to the [manual setup documentation](https://github.com/DorianTrn2/socialnetwork_backend?tab=readme-ov-file#manual-setup) for detailed instructions.

### Backend URL

With or without Docker, the backend will, by default, start on `http://localhost:3001`. If you change this, you must also update the `BACKEND_URI` variable in the frontend to match your chosen URL. This variable is located in:

```
src/app/core/constant/url.constant.ts
```

## Running the Application

To start the development server, run:

```shell
ng serve
```

The frontend will be available at `http://localhost:4200`. The backend's CORS policy enforces requests from this specific address, so changing it may cause issues.

