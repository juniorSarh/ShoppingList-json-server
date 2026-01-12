# Shopping List API

A JSON Server API for managing shopping lists, users, and items.

## Endpoints

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /lists` - Get all lists
- `POST /lists` - Create a new list
- `GET /items` - Get all items
- `POST /items` - Create a new item

## Deployment

This app is configured for deployment on Render using the `render.yaml` blueprint file.

### Deploy to Render:

1. Push your code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect and deploy using `render.yaml`

## Local Development

```bash
npm install
npm start
```

The server will run on http://localhost:3000
